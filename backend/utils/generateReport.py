# uv run -m utils.generateReport

from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from utils.prompts import developer_prompt, assistant_prompt
from typing import List

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Bullet(BaseModel):
    hook: str
    explanation: str
    stat: str

class Report(BaseModel):
    zinger_headline: str
    killer_insight: str
    what_we_asked: str
    what_stood_out: List[Bullet]

def generate_report(data: str):
    resp = client.responses.parse(
        model="gpt-5",
        input=[
            {"role": "developer", "content": developer_prompt},
            {"role": "user", "content": assistant_prompt + "\n\n" + data},
        ],
        text_format=Report,
        reasoning={
            "effort": "minimal",
            "summary": "auto"
        }
    )
    
    zinger_headline = resp.output[1].content[0].parsed.zinger_headline
    killer_insight = resp.output[1].content[0].parsed.killer_insight
    what_we_asked = resp.output[1].content[0].parsed.what_we_asked
    what_stood_out = resp.output[1].content[0].parsed.what_stood_out

    return {
        "zinger_headline": zinger_headline, 
        "killer_insight": killer_insight, 
        "what_we_asked": what_we_asked,
        "what_stood_out": what_stood_out
        }

if __name__ == "__main__":
    data = """Here is the data you should use to create the report:
Q570d: Here are some different areas of health that some people say they're looking to improve or want help with. Which of the following are you looking to improve personally, if any?
Sleep & relaxation: 26%
Energy levels: 23%
Weight loss: 21%
Mental health or mood: 20%
Joint health: 20%
Gut health: 19%
Teeth or oral health: 18%
None of these: 17%
Hair or skin or nails: 16%
Immunity: 15%
Bone health: 15%
Men's health: 15%
Strength or building muscle: 15%
Heart & circulation or cardiovascular health: 15%
Women's health: 13%
Sports or workout performance: 9%
Weight gain: 9%
Children's health: 6%
Sports or workout recovery: 6%
Pregnancy and fertility: 5%
Other: 1%
"""

    output = generate_report(data)
    print("Zinger Headline: ", output["zinger_headline"])
    print("\n")
    print("Killer Insight: ", output["killer_insight"])
    print("\n")
    print("What We Asked: ", output["what_we_asked"])
    print("\n")
    print("What Stood Out: ", output["what_stood_out"])