import { FontIcon, initializeIcons, Stack } from "@fluentui/react";
import { SurveyFreeText } from "./components/surveys/survey-free-text";
import * as surveyResults from './data/survey_results.json';
import { SurveyResult, Question, QuestionType } from './SurveyResults';

initializeIcons();

function App() {
  // assert type of JSON data:
  const results: SurveyResult = surveyResults as SurveyResult;

  let totalResponses = 0;
  let totalScore = 0;

  results.questions.forEach((question: Question) => {
    if (question.type === "number" as QuestionType) {
      totalResponses += question.responses.length;
      totalScore += question.responses.reduce((a: any, b: any) => a + b, 0);
    }
  });

  // Calculate happiness score
  const happinessScore = Math.round((totalScore / totalResponses) * 20);

  return (
    <Stack style={{ margin: 20 }}>
      <h1>
        <FontIcon iconName="ClipboardList" style={{ marginRight: "5px" }} />
        {results.survey_title}
      </h1>
      <p>The survey was started on {results.created_at}. Overall {results.questions[0].responses.length} people participated in the survey</p>

      <h1 data-testid="happinessScore">
        <FontIcon iconName="ChatBot" style={{ marginRight: "5px" }} />
        {happinessScore} / 100
      </h1>
      <Stack>
        <SurveyFreeText />
      </Stack>
    </Stack>
  );
}

export default App;
