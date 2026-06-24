import asyncio
from graph.graph import get_graph_app
from langchain_core.runnables.config import RunnableConfig
from langgraph.types import Command

async def get_room_sid():
    return "roomsid1234"
async def main():
    session_id = "4a8eab5f-cbe7-45a4-9d89-2e8c57a6b2fd"
    
    graph = await get_graph_app()
    transcript = input("Ask question: ")
    graph_input = {
        "session_id" : session_id,
        "thread_id": session_id,
        "user_transcript": transcript,
    }
    config=RunnableConfig(
        configurable={
            "thread_id" : session_id,
        }
    )
    while True:
        interrupted = False
        
        async for chunk in graph.astream(
            graph_input,
            config, 
            stream_mode=[ "updates"]
        ):
            print(chunk)
        
        state = await graph.aget_state(config)
        
        if state.interrupts:
            interrupted = True
            interrupt_payload = state.interrupts[0].value
            print("\n=== INTERRUPTED ===")
            print(interrupt_payload["final_response"])
            user_transcript = input(
                "\nUser response: "
            )
            graph_input = Command(
                resume=user_transcript
            )
        
        if not interrupted:
            print("\n=== GRAPH COMPLETED ===")
            break        

if __name__ == "__main__":
    asyncio.run(main())