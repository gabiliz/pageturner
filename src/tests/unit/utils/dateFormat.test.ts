import { describe, expect, it } from "vitest";
import { formatAge, formatBirthday, formatCreatedUserDate, formatPublishedDate } from "~/utils/dateFormat";


describe("format date", () => {
  it("should return formated birthday text", () => {
    const birthday = formatBirthday(new Date("2002-02-15T03:24:00"));

    expect(birthday).toEqual('15 de fevereiro')
  })

  it("should return text doesn't have birthday", () => {
    const birthday = formatBirthday(null);

    expect(birthday).toEqual('Edite seu perfil para aparecer seu Aniversário!')
  })

  it("should return formated created date text", () => {
    const createdDate = formatCreatedUserDate(new Date("2023-10-30T03:24:00"));

    expect(createdDate).toEqual('Entrou em outubro de 2023')
  })

  it("should return formated created date text", () => {
    const birthday = formatAge(new Date("2002-02-15T03:24:00"));

    expect(birthday).toEqual('21 anos')
  })

  it("should return formated created date text", () => {
    const publishedDate = formatPublishedDate("2006-03-16");

    expect(publishedDate).toEqual('16 de março de 2006')
  })
})