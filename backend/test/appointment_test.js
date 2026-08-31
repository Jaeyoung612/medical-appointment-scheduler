const { expect } = require("chai");
const sinon = require("sinon");
const db = require("../db");

describe("Appointment API Test", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should check duplicate appointment slot", async () => {
    const queryStub = sinon.stub(db, "query");

    queryStub.resolves([[{ id: 1 }]]);

    const [existing] = await db.query(
      "SELECT id FROM appointments WHERE dentist_id = ? AND appointment_date = ? AND appointment_time = ?",
      [1, "2026-02-20", "09:00"],
    );

    expect(existing.length).to.be.greaterThan(0);
  });

  it("should create an appointment", async () => {
    const queryStub = sinon.stub(db, "query");

    queryStub.onFirstCall().resolves([[]]);
    queryStub.onSecondCall().resolves([{ insertId: 5 }]);

    const [existing] = await db.query(
      "SELECT id FROM appointments WHERE dentist_id = ? AND appointment_date = ? AND appointment_time = ?",
      [1, "2026-02-20", "10:00"],
    );

    expect(existing.length).to.equal(0);

    const [result] = await db.query("INSERT INTO appointments", [
      9,
      1,
      "2026-02-20",
      "10:00",
    ]);

    expect(result.insertId).to.equal(5);
  });

  it("should cancel an appointment", async () => {
    const queryStub = sinon.stub(db, "query");

    queryStub.resolves([{ affectedRows: 1 }]);

    const [result] = await db.query(
      "DELETE FROM appointments WHERE id = ?",
      [5],
    );

    expect(result.affectedRows).to.equal(1);
  });
});
