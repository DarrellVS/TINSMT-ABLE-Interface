import InteractiveArea from "../components/System/InteractiveArea";
import ProcessesManager from "../components/System/ProcessesManager";
import Layout from "../components/Layout";
import Welcome from "../components/System/Welcome";
import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";
import Calendar from "../components/Widgets/Calendar";

export default function Home() {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  useEffect(() => {
    if (isMobile) window.location.assign("https://ablestore.darrellvs.nl");
  }, [isMobile]);

  return (
    <Welcome>
      <Calendar />
      <ProcessesManager>
        <Layout>
          <InteractiveArea />
        </Layout>
      </ProcessesManager>
    </Welcome>
  );
}
