import React from "react";
import Box from "@mui/material/Box";
import { ClientSafeProvider, providers, signIn } from "next-auth/client";
import { google } from "../providers";

interface IProps {
  providers: Promise<Record<string, ClientSafeProvider> | null>;
}
type ProviderComponent = { [key: string]: React.FC<any> };

const providersComponents: ProviderComponent = {
  Google: google,
};
const SignInPage: React.FC<IProps> = ({ providers }: IProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        gridTemplateRows: "auto",
        gridTemplateAreas: `". . ."
      ". loginIcon ."
      ". . ."`,
      }}
    >
      <Box sx={{ gridArea: "loginIcon" }}>
        {Object.values(providers).map((provider) => {
          const ProviderComponent = providersComponents[provider.name];
          return (
            ProviderComponent && (
              <ProviderComponent
                key={provider.name}
                onClick={() => signIn(provider.id)}
              />
            )
          );
        })}
      </Box>
    </Box>
  );
};

export default SignInPage;

export async function getServerSideProps(context: any) {
  return {
    props: {
      // @ts-ignore: Unreachable code error
      providers: await providers(context),
    },
  };
}
