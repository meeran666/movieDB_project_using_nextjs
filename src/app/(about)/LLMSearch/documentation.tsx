import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function documentation() {
  const code1 = `const stream = new ReadableStream({ 
  async start(controller) {
    try {
      request_signal.addEventListener("abort", () => {
        console.log(" Client aborted request");
        controller.close();
      });
      for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
        if (topicIndex === 6) {
          break;
        }
        let buffer = "";
        const topic =
          topics[topicIndex][0].toUpperCase() + topics[topicIndex].slice(1);
        const header = \`\\n<div style="width: 100%">
          <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">\${topic}</strong></div>\\n\\n\`;
        controller.enqueue(encoder.encode(header));
        // Create a NEW streaming LLM for EACH topic
        const repo_id = "deepseek/deepseek-chat-v3.1";
        const llm = new ChatOpenAI({
          model: repo_id,
          apiKey: process.env.OPENROUTER_API_KEY,
          temperature: 0.7,
          configuration: { baseURL: "https://openrouter.ai/api/v1" },
          streaming: true,
          // maxTokens: 20,
          callbacks: [
            {
              handleLLMNewToken(token: string) {
                buffer += token;
                console.log(token);
                controller.enqueue(encoder.encode(token));
              },
            },
          ],
        });
        const formattedPrompt = await prompt_template.format({
          title,
          topic: topics[topicIndex],
        });
        await llm.invoke(formattedPrompt);
      }
      
      controller.close();
    } catch (err) {
      controller.error(err);
    }
  },
});`;
  const code2 = `<div className="mx-auto aspect-video w-full max-w-3xl">
{
  <iframe
    className="h-full w-full rounded-xl"
    src={embedUrl}
    title="YouTube trailer"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
}
</div>  `;
  return (
    <>
      <div className="pb-20 text-4xl font-bold">AI Search</div>
      <div className="pb-15">
        This Ai search has 3 distinct parts. First part is showcasing six images
        of movie posters in grid like pattern. Second part is LLM text output
        which stream to the frontend. Third part is youtube video that is
        trailer of movie is integrated at the end.
      </div>
      <div className="flex items-center justify-center pb-15">
        <div className="w-[min(40rem,100%)] items-center justify-center">
          <img src="/AI_image.jpg" alt="" className={`h-auto w-full`} />
        </div>
      </div>
      <div className="pb-15 text-3xl font-bold">Images</div>
      <div className="pb-15">
        My AI feature output the image urls which render in frontend but these
        image urls are not LLM response these image urls come from duckduckgo
        api where these images gets attached before LLM response. There are
        total of six image url come from api, five image url are movie posters
        and one as official movie poster used for advertisement. In frontend, it
        is put in grid system of 14 rows and 18 columns.
        <br />
        <br />
        Image urls does not send directly to backend from api of duckduckgo, it
        is a two step process. First step is two find the vqd code of images
        which found in response from the route
        <span className="text-blue-700">
          {" https://duckduckgo.com/?q=${encodeURIComponent(query)} "}
        </span>
        . This vqd repersent the unique value of image in web. This vqd code let
        you extract the images url from the web using the route
        <span className="text-blue-700">
          {
            " https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query,)}&vqd=${vqd} "
          }
        </span>
      </div>
      <div className="pb-15 text-3xl font-bold">LLM Text </div>
      The text response comes from the LLM deepseek-chat-v3.1 which is hosted by
      third party organization(OpenRouter). For managing the output and input of
      LLM i used langchain framework on backend. You can learn about the
      langchain frameword here
      <a
        href="https://docs.langchain.com/oss/python/langchain/overview"
        className="text-blue-400"
      >
        {" https://docs.langchain.com/oss/python/langchain/overview "}
      </a>
      On the basis of promt LLM response, the prompt has 3 section first is
      system section that is
      {` "it is expert on topic of movies"`}, second section is the main prompt.
      Third section is defining variables used in promt.
      <br />
      <br />
      {`"token_number"`} and {`"max_token_number"`} are the variables which
      filled in prompt dynamically during execution, so the values of{" "}
      {`"token_number"`} and {`"max_token_number"`} is varies randomly between
      35 to 50 and 85 to 100 respectively.
      <br />
      <br />
      The API connection for the LLM can be defined by ChatOpenAI class from
      langchain. ChatOpenAI contains many fields which are below
      <br />
      <br />
      <div className="pb-8 text-2xl font-semibold">model</div>
      <div className="pb-6">
        This field accepts model name. The primary argument for specifying the
        model in ChatOpenAI in LangChain.js is the model parameter, which is
        passed during instantiation to determine the specific OpenAI model to
        use, such as gpt-4o, deepseek-chat-v3.1, gpt-3.5-turbo and many more.
      </div>
      <div className="mb-10 overflow-x-scroll border-2 border-gray-400 p-3 whitespace-nowrap">
        model?: OpenAIChatModelId <br />
        OpenAIChatModelId: OpenAIClient.ChatModel | string &
        NonNullable&lt;unknown&gt;
      </div>
      <div className="pb-8 text-2xl font-semibold">apikey</div>
      <div className="pb-6">
        API key to use when making requests to OpenAI. Defaults to the value of
        OPENAI_API_KEY environment variable. This field is optional.
        <br />
        <br />
        You can provide the API key in two primary ways:
        <br />
        <br />
        First method explicitly passes the key when initializing the model,
        which is useful if you need to use multiple keys or manage them outside
        of environment variables
        <br />
        <br />
        Second method is the standard and more secure approach, preventing your
        secret key from being hardcoded in your source files. The ChatOpenAI
        class will automatically look for the OPENAI_API_KEY variable.
      </div>
      <div className="mb-10 overflow-x-scroll border-2 border-gray-400 p-3 whitespace-nowrap">
        apiKey?: string
      </div>
      <div className="pb-8 text-2xl font-semibold">temperature</div>
      <div className="pb-6">
        Sampling temperature to use. This field is optional.
      </div>
      <div className="mb-10 overflow-x-scroll border-2 border-gray-400 p-3 whitespace-nowrap">
        temperature?: number
      </div>
      <div className="pb-8 text-2xl font-semibold">configuration</div>
      <div className="pb-6">
        {`The temperature argument in LangChain's ChatOpenAI class controls
            the randomness/creativity of the generated response. It is a float
            value that can be specified during the initialization of the model
            instance. This field is optional.`}
      </div>
      <div className="mb-10 overflow-x-scroll border-2 border-gray-400 p-3 whitespace-nowrap">
        configuration?: ClientOptions
        <br></br>
        ClientOptions contain many other fields but i used only baseURL.
        <br></br>
        baseURL?: null | string;
      </div>
      <div className="pb-8 text-2xl font-semibold">streaming</div>
      <div className="pb-6">
        {`In LangChain's ChatOpenAI class, you enable token-by-token output by
            setting the streaming argument to True. Enabling disables tokenUsage
            reporting.Note: If your specific model integration does not support the streaming parameter, you may need to use disable_streaming=True. This field is optional.`}
      </div>
      <div className="mb-10 overflow-x-scroll border-2 border-gray-400 p-3 whitespace-nowrap">
        streaming?: boolean
      </div>
      <div className="pb-8 text-2xl font-semibold">callbacks</div>
      <div className="pb-6">
        A callback in BaseChatModel parameters in LangChain.js refers to the
        mechanism for handling events during the execution of the model call. It
        allows you to log events, stream intermediate results, or perform other
        actions in real-time as the model processes the request. This field is
        optional.
      </div>
      <div className="mb-15 overflow-x-scroll border-2 border-gray-400 p-3 whitespace-nowrap">
        callbacks?: Callbacks
        <br></br>
        Callbacks: CallbackManager | (BaseCallbackHandler |
        CallbackHandlerMethods)[]
      </div>
      <div className="pb-15 text-2xl font-extrabold">
        Streaming LLM Output with LangChain.js
      </div>
      <div className="pb-7">
        <SyntaxHighlighter
          className="overflow-x-hidden pb-7 text-[15px]"
          language="javascript"
          style={atomDark}
          showLineNumbers={true}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code1}
        </SyntaxHighlighter>
      </div>
      <div className="pb-15 whitespace-pre-line">
        {`This code demonstrates how to stream Large Language Model (LLM)
            responses in real time using LangChain.js and the Web Streams API. A
            ReadableStream is created to push HTML headers and AI-generated
            tokens incrementally to the client. For each topic, a new ChatOpenAI
            instance is initialized with streaming enabled, and LangChain's
            handleLLMNewToken callback is used to send tokens as they are
            generated. The implementation also listens for client abort events
            using an AbortSignal to safely close the stream and prevent
            unnecessary computation. This approach enables ChatGPT-like token
            streaming, structured topic-wise output, and efficient resource
            handling in web applications.

            This code demonstrates an advanced pattern for streaming Large
            Language Model (LLM) responses to a client in real time using
            LangChain.js, the Web Streams API, and OpenAI-compatible chat models
            hosted through OpenRouter. Instead of waiting for the complete AI
            response, the system sends content incrementally as it is generated,
            providing a responsive, ChatGPT-like user experience.

            To ensure efficient resource usage, the stream listens for client-side cancellation events using an AbortSignal. If the client aborts the request (for example, by navigating away or closing the connection), the stream is immediately closed. This prevents unnecessary streaming and improves server stability. Abort handling is especially important when working with token-based LLMs, which can continue generating output even after the client disconnects.
            
            The code iterates through a list of predefined topics and streams content for each topic separately. A hard limit is applied to the number of topics processed to avoid excessive output. For every topic, a formatted HTML header is streamed first, allowing the client interface to display section titles immediately before the AI-generated explanation begins. This structure improves readability and user experience by clearly separating content into sections.`}
      </div>
      <div className="pb-15 text-3xl font-bold">Youtube video of trailer </div>
      <div className="pb-15">
        This is the last part of aisearch where youtube video section is atached
        at the end of response. For working of youtube in forntend, I used
        iframe tag of html. This iframe takes attribute of embedurl which comes
        from the backend. In backend, this embedurl comes from the route
        <code>{` https://www.googleapis.com/youtube/v3/search?part=snippet&q=\${encodeURIComponent(query)}&type=video&maxResults=1&key=\${YT_API_KEY},
  { signal: req.signal }
);
`}</code>
        , here YT_API_KEY is youtube api key which is for the youtube access for
        this website. To create a YouTube API key, log into the Google Developer
        Console, create a new project, enable the YouTube Data API v3, and then
        generate an API key under the credentials section.
      </div>
    </>
  );
}

export default documentation;
