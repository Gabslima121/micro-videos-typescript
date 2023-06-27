import InvalidUuidError from "../../@seedwork/errors/invalid-uuid.error"
import UniqueEntityId from "./unique-entity-id.vo"
import { validate as validateUUID } from 'uuid'

function spyValidate(){
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
}

describe("Unique Entity ID Unit Tests", () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = spyValidate()

    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError)
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in the constructor', () => {
    const validateSpy = spyValidate()

    const uuid = '0211106a-aa83-4544-b076-5f226cb2b833'
    const valueObject = new UniqueEntityId(uuid)

    expect(valueObject?.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should instantiate the class with no id beeing passed in the constructor', () => {
    const validateSpy = spyValidate()

    const valueObject = new UniqueEntityId()

    expect(validateUUID(valueObject?.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })
})