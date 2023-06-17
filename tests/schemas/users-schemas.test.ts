import { faker } from "@faker-js/faker";
import { createUserSchema } from "@/schemas";

describe("createUserSchema", () => {
  const generateValidInput = () => ({
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
  });

  describe("when username is not valid", () => {
    it("should return error if username is not present", () => {
      const input = generateValidInput();
      delete input.username;

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if username length is less than 3", () => {
      const input = generateValidInput();
      input.username = faker.string.alpha(2);

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when email is not valid", () => {
    it("should return error if email is not present", () => {
      const input = generateValidInput();
      delete input.email;

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if email does not follow valid email format", () => {
      const input = generateValidInput();
      input.email = faker.lorem.word();

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when password is not valid", () => {
    it("should return error if password is not present", () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is shorter than 6 characters", () => {
      const input = generateValidInput();
      input.password = faker.lorem.word(5);

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = createUserSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
