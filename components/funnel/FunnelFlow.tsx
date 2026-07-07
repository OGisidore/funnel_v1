import StageArrivee from "@/components/funnel/stages/StageArrivee";
import StageVSL from "@/components/funnel/stages/StageVSL";
import StagePainPoints from "@/components/funnel/stages/StagePainPoints";
import StageTransformation from "@/components/funnel/stages/StageTransformation";
import StageDecision from "@/components/funnel/stages/StageDecision";
import StagePreparation from "@/components/funnel/stages/StagePreparation";
import StageAssessment from "@/components/funnel/stages/StageAssessment";
import StageProblem from "@/components/funnel/stages/StageProblem";
import StageSprint from "@/components/funnel/stages/StageSprint";
import StageMethodology from "@/components/funnel/stages/StageMethodology";
import StageParcours from "@/components/funnel/stages/StageParcours";
import StageBigIdea from "@/components/funnel/stages/StageBigIdea";
import { DictShape } from "@/app/i18n/dictionaries/fr";

interface FunnelFlowProps {
  dict: DictShape;
}

export default function FunnelFlow({ dict }: FunnelFlowProps) {
  return (
    <main className="w-full">
      <StageArrivee dict={dict} />
      <StageVSL dict={dict} />
      <StagePainPoints dict={dict} />
      <StageTransformation dict={dict} />
      <StageDecision dict={dict} />
      <StagePreparation dict={dict} />
      <StageAssessment dict={dict} />
      <StageProblem dict={dict} />
      <StageSprint dict={dict} />
      <StageMethodology dict={dict} />
      <StageParcours dict={dict} />
      <StageBigIdea dict={dict} />
    </main>
  );
}
