import css from './styles.module.scss'

export function Player() {
  return (
    <div className={css.player}>
      <header>
        <img src='/playing.svg' alt='Tocando agora' />
        <strong>Tocando agora</strong>
      </header>

      <div className={css.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={css.empty}>
        <div className={css.progress}>
          <span>00:00</span>

          <div className={css.slider}>
            <div className={css.emptySlider} />
          </div>

          <span>00:00</span>
        </div>

        <div className={css.buttons}>
          <button type='button'>
            <img src='/shuffle.svg' alt='Embaralhar' />
          </button>
          <button type='button'>
            <img src='/play-previous.svg' alt='Tocar anterior' />
          </button>
          <button type='button' className={css.playButton}>
            <img src='/play.svg' alt='Tocar' />
          </button>
          <button type='button'>
            <img src='/play-next.svg' alt='Tocar próximo' />
          </button>
          <button type='button'>
            <img src='/repeat.svg' alt='Repetir' />
          </button>
        </div>
      </footer>
    </div>
  )
}
