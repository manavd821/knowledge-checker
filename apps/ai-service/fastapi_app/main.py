from pydantic import BaseModel, ConfigDict
from fastapi_app.bootstrap.app_factory import create_app
from models.enums import AI_STRICTNESS, Difficulty
from models import (
    TopicType,
    Difficulty,
    AI_STRICTNESS,
)
from fastapi_app.dependencies import evaluation_service, question_service

app = create_app()

@app.get('/')
async def home():
    return "hello"
class Evaluation(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
    )
    
    topic_type : TopicType
    difficulty : Difficulty
    ai_strictness : AI_STRICTNESS
    question : str
    answer : str
    active_context : str

@app.post('/test')
async def test_evaluate_turn(
    evaluation : Evaluation,
    evaluation_service : evaluation_service
    ):
    res = await evaluation_service.evaluate_turn(**evaluation.model_dump())
    print(type(res))
    print(res)
    return res

class Question(BaseModel):
    topic_type : TopicType | None
    domain : str | None
    current_difficulty : Difficulty | None
    ai_strictness : AI_STRICTNESS | None
    fundamental_phase : bool
    session_brief : str | None
    custom_instructions : str | None
    overall_score : float | None
    previous_score : float | None
    active_context : str
    
@app.post('/test2')
async def test_question_generator(
    question : Question,
    question_service : question_service
    ):
    res = await question_service.generate_question(**question.model_dump())
    print(type(res))
    print(res)
    return res
