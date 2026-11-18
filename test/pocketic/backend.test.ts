import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { createIdentity } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";
import { registerCaller } from "./test-utils";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

const admin = createIdentity("admin");
const student = createIdentity("student");

function actorFor(identity: ReturnType<typeof createIdentity>): Actor<_SERVICE> {
  const actor = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  actor.setIdentity(identity);
  return actor;
}

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  const installed = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  });
  canisterId = installed.canisterId;
  // The first caller to initialize access control becomes the administrator.
  await registerCaller(installed.actor, admin);
  // The admin still needs an approved profile before guarded reads succeed.
  await installed.actor.registerProfile("Admin", "Staff");
  await installed.actor.setUserApproval(admin.getPrincipal(), {
    approved: null,
  });
});

afterAll(async () => {
  await pic?.tearDown();
});

it("answers an empty-state read instead of trapping", async () => {
  const adminActor = actorFor(admin);
  await expect(adminActor.listHomework()).resolves.toEqual([]);
});

it("returns no profile for a signed-in caller who has not registered", async () => {
  const newcomer = createIdentity("newcomer");
  const newcomerActor = actorFor(newcomer);
  await expect(newcomerActor.getCallerProfile()).resolves.toEqual([]);
});

it("returns the caller's own profile once they register", async () => {
  const registrant = createIdentity("registrant");
  const registrantActor = actorFor(registrant);
  await registrantActor.registerProfile("Rita Registrar", "11B");

  const profile = await registrantActor.getCallerProfile();
  expect(profile).toHaveLength(1);
  expect(profile[0]).toMatchObject({
    displayName: "Rita Registrar",
    className: "11B",
    approval: { pending: null },
  });
});

it("lets an approved student submit new homework as a Pending submission", async () => {
  const adminActor = actorFor(admin);
  const studentActor = actorFor(student);

  await studentActor.registerProfile("Sam Student", "10A");
  await adminActor.setUserApproval(student.getPrincipal(), { approved: null });

  const submission = await studentActor.submitHomework(
    { newHomework: null },
    [],
    "English",
    "My new essay",
    "Draft",
    0n,
    0n,
  );

  expect(submission.status).toEqual({ pending: null });
  expect(submission.kind).toEqual({ newHomework: null });
  expect(submission.title).toBe("My new essay");

  // The admin queue sees the same Pending submission.
  const queue = await adminActor.listSubmissions();
  expect(queue).toContainEqual(
    expect.objectContaining({ id: submission.id, status: { pending: null } }),
  );
});

it("refuses the admin-only addHomework for a student caller", async () => {
  const studentActor = actorFor(student);
  await expect(
    studentActor.addHomework("Maths", "Not allowed", "", 0n, 0n),
  ).rejects.toThrow();
});

it("rejects an anonymous caller on a guarded read", async () => {
  const guest = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(guest.listHomework()).rejects.toThrow();
});
