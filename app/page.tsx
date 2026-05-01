import Hero from "@/components/ui/Hero";
import FeatureGrid from "@/components/ui/FeatureGrid";
import Roadmap from "@/components/election/Roadmap";
import StoryMode from "@/components/election/StoryMode";
import KnowledgeCards from "@/components/election/KnowledgeCards";
import VotingGuide from "@/components/simulator/VotingGuide";
import VotingSimulator from "@/components/simulator/VotingSimulator";
import ElectionQuiz from "@/components/quiz/ElectionQuiz";
import BoothFinder from "@/components/election/BoothFinder";
import VoteCounting from "@/components/election/VoteCounting";
import LiveUpdatesFeed from "@/components/election/LiveUpdatesFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <VotingGuide />
      <BoothFinder />
      <Roadmap />
      <StoryMode />
      <VotingSimulator />
      <LiveUpdatesFeed />
      <KnowledgeCards />
      <VoteCounting />
      <ElectionQuiz />
    </>
  );
}
