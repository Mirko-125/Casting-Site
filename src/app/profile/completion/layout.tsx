import { Providers } from "@/app/profile/completion/providers";

const CompletionLayout = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default CompletionLayout;
