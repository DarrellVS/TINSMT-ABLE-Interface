import InteractiveArea from "../components/InteractiveArea";
import ProcessesManager from "../components/System/ProcessesManager";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <ProcessesManager>
      <Layout>
        <InteractiveArea />
      </Layout>
    </ProcessesManager>
  );
}
