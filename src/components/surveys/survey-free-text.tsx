import { GroupedList, IGroup } from "@fluentui/react";
import { FunctionComponent } from "react";
import * as surveyResults from '../../data/survey_results.json';
import { SurveyResult, Question } from '../../SurveyResults';

export const SurveyFreeText: FunctionComponent = () => {
  const results: SurveyResult = surveyResults as SurveyResult;

  // Filter the questions to only those of type "text"
  const textQuestions = results.questions.filter(q => q.type === "text");

  const items: Array<{ key: string, responses: string[] }> =
    textQuestions.map((question: Question) => {
      return {
        key: question.question_text,
        responses: question.responses.map((response) => `${response}`)  // convert to string
      }
    });

  const groups: IGroup[] = items.map((item, index) => {
    return {
      key: `group${index}`,
      name: `${item.key} (${item.responses.length})`,
      startIndex: index,
      count: 1,
      isCollapsed: true,
    }
  });

  // Modify the render cell function to display responses on separate lines
  const _onRenderCell = (nestingDepth?: number, item?: any): JSX.Element => {
    return <div style={{ paddingLeft: '10px' }}>{item.responses.map((response: any, index: any) => <p key={index}>{response}</p>)}</div>
  };

  return (
    <div style={{ paddingLeft: '10px' }}>
      <GroupedList
        items={items}
        onRenderCell={_onRenderCell}
        groups={groups}
      />
    </div>
  );
};
