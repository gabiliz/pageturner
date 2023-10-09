import { format } from "date-fns";
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