import { format, parseISO } from "date-fns";
import { pt } from "date-fns/locale";

export function formatBirthday (birthday: Date | undefined | null) {
  if (birthday) {
    const day = format(birthday, 'dd');
    const month = format(birthday, 'MMMM', { locale: pt })
  
    return `${day} de ${month}`
  }

  return `Edite seu perfil para aparecer seu Aniversário!`
}

export function formatCreatedUserDate(createdAt: Date | undefined) {
  if (createdAt) {
    const month = format(createdAt, 'MMMM', { locale: pt });
    const year = format(createdAt, 'yyyy');

    return `Entrou em ${month} de ${year}`;
  }

  return '';
}

export function formatAge(birthday: Date | undefined | null) {
  if (birthday) {
    const todayDate = new Date()
    const age = todayDate.getFullYear() - birthday.getFullYear()

    return `${age} anos`
  }

  return '';
}

export function formatPublishedDate(publishedDate: string) {
  if (publishedDate) {
    const date = parseISO(publishedDate);
    const formatedDate = format(date, "d 'de' MMMM 'de' yyyy", { locale: pt });

    return formatedDate
  }

  return '';
}