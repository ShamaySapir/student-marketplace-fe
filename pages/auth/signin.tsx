import React from "react";
import Box from "@mui/material/Box";
import { ClientSafeProvider, providers, signIn } from "next-auth/client";
import providersComponent from "../../components/providers";

interface IProps {
  providers: Promise<Record<string, ClientSafeProvider> | null>;
}
type ProviderComponent = { [key]: React.FC };

const providersComponents: ProviderComponent = {
  google: providersComponent.google,
};
const SignInPage: React.FC = ({ providers }: IProps) => {
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
            <ProviderComponent
              key={provider.name}
              onClick={() => signIn(provider.id)}
            />
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
      providers: await providers(context),
    },
  };
}
