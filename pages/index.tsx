import type { NextPage } from 'next'
import { getSession, GetSessionParams } from 'next-auth/react'
import Head from 'next/head'
import Center from '../Components/Center'
import Sidebar from '../Components/Sidebar'
import Player from '../Components/Player'
const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title> Spotify 2.0.0 </title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <Player />
    </div>
  )
}

export default Home

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
