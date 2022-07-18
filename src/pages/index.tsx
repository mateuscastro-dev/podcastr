import Image from 'next/image'
import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '../utils/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

import css from '../styles/home.module.scss'

interface Episode {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: number
  durationAsString: string
  description: string
  url: string
}

interface HomeProps {
  episodes: {
    latest: Episode[]
    all: Episode[]
  }
}

export default function Home({ episodes }: HomeProps) {
  return (
    <div className={css.home}>
      <section className={css.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {episodes.latest.map(episode => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit='cover'
                />

                <div className={css.epidoseDetails}>
                  <a href='#'>{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type='button'>
                  <img src='/play-green.svg' alt='Tocar episódio' />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={css.allEpisodes}></section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 7,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes: Episode[] = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url
    }
  })

  return {
    props: {
      episodes: {
        latest: episodes.slice(0, 2),
        all: episodes.slice(2, episodes.length)
      }
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}
