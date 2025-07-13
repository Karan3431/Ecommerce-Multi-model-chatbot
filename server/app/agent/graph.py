from langgraph.graph import StateGraph, END
from app.agent.state import AgentState
from app.agent.nodes import (
    agent_entry,
    check_for_rag,
    retrieve_from_rag,
    run_web_search,
    generate_with_context,
    generate_with_web_context,
    generate_direct,
)

def create_agent_graph():
    """
    Creates the LangGraph agent by defining nodes and the edges between them.
    Enhanced to support RAG, web search, and direct generation.
    """
    graph = StateGraph(AgentState)

    # 1. Add all nodes to the graph
    graph.add_node("agent_entry", agent_entry)
    graph.add_node("retrieve_from_rag", retrieve_from_rag)
    graph.add_node("run_web_search", run_web_search)
    graph.add_node("generate_with_context", generate_with_context)
    graph.add_node("generate_with_web_context", generate_with_web_context)
    graph.add_node("generate_direct", generate_direct)

    # 2. Set the entry point for the graph
    graph.set_entry_point("agent_entry")

    # 3. Define the conditional routing from entry
    graph.add_conditional_edges(
        source="agent_entry",
        path=check_for_rag,
        path_map={
            "rag_retrieval": "retrieve_from_rag",
            "web_search": "run_web_search",
            "generate_direct": "generate_direct"
        }
    )

    # 4. Define the edges for different paths
    graph.add_edge("retrieve_from_rag", "generate_with_context")
    graph.add_edge("run_web_search", "generate_with_web_context")

    # 5. Define the finish points for all paths
    graph.add_edge("generate_with_context", END)
    graph.add_edge("generate_with_web_context", END)
    graph.add_edge("generate_direct", END)

    # 6. Compile the graph into a runnable executor
    return graph.compile()