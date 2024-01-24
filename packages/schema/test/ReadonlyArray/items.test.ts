import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"
import { describe, it } from "vitest"

describe("ReadonlyArray > items", () => {
  const schema = S.array(S.number).pipe(S.itemsCount(2))
  it("decoding", async () => {
    await Util.expectDecodeUnknownFailure(
      schema,
      [],
      `an array of exactly 2 items
└─ Predicate refinement failure
   └─ Expected an array of exactly 2 items, actual []`
    )
    await Util.expectDecodeUnknownFailure(
      schema,
      [1],
      `an array of exactly 2 items
└─ Predicate refinement failure
   └─ Expected an array of exactly 2 items, actual [1]`
    )
    await Util.expectDecodeUnknownSuccess(schema, [1, 2])
    await Util.expectDecodeUnknownFailure(
      schema,
      [1, 2, 3],
      `an array of exactly 2 items
└─ Predicate refinement failure
   └─ Expected an array of exactly 2 items, actual [1,2,3]`
    )
  })
})
