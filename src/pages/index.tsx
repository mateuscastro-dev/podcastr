import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '../utils/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

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
  episodes: Episode[]
}

export default function Home(props: HomeProps) {
  return (
    <>
      <h1>podcastr</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
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

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.id,
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
      episodes
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}
