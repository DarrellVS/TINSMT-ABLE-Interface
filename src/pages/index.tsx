import InteractiveArea from "../components/System/InteractiveArea";
import ProcessesManager from "../components/System/ProcessesManager";
import Layout from "../components/Layout";
import Welcome from "../components/System/Welcome";

export default function Home() {
  return (
    <Welcome>
      <ProcessesManager>
        <Layout>
          <InteractiveArea />
        </Layout>
      </ProcessesManager>
    </Welcome>
  );
}
