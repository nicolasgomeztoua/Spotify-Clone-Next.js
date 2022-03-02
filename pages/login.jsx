import { getProviders, signIn } from "next-auth/react";


const Login = ({providers}) => {


  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img
        className="w-52 mb-5"
        src="https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"
        alt="spotify-logo"
      />
      { Object.values(providers).map((provider, index) => {
        return (
          <div key={provider.name}>
            <button
              className="bg-[#18DB60] text-white p-5 rounded-full"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  let providers = await getProviders();
  return {
    props: {providers}, // will be passed to the page component as props
  }
}
