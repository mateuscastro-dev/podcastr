import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import css from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR
  })

  return (
    <header className={css.header}>
      <img src='/logo.svg' alt='Podcastr' />
      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  )
}
