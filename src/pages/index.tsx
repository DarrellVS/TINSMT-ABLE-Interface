import InteractiveArea from "../components/InteractiveArea";
import ProcessesManager from "../components/Processes/ProcessesManager";
import Layout from "../components/Layout";
import { Button } from "@chakra-ui/react";
import useFullscreen from "../hooks/useFullscreen";

export default function Home() {
  const onClick = () => {
    document.body.requestFullscreen();
  };

  const { isFullscreen } = useFullscreen();
  console.log(isFullscreen);

  return (
    <>
      <Button onClick={onClick}>set fs</Button>
      <ProcessesManager>
        <Layout>
          <InteractiveArea />
        </Layout>
      </ProcessesManager>
    </>
  );
}
