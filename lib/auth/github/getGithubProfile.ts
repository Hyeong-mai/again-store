interface IProfileResponse {
  id: string;
  name: string;
  profile_photo: string;
}

export default async function getGithubProfile(
  access_token: string
): Promise<IProfileResponse> {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const profile = await userProfileResponse.json();
  return {
    id: profile.id,
    name: profile.login,
    profile_photo: profile.avatar_url,
  };
}
