// Blog posts. Body entries: plain string = paragraph; "## " / "### " prefixes =
// headings; "> " prefix = pull quote; { code: "..." } = code block;
// { list: [...] } = bulleted list. `canonicalUrl` + `canonicalLabel` credit the
// original publication.
export const posts = [
  {
    slug: "building-scalable-graphql-apis-with-amplify",
    title: "Building scalable GraphQL APIs with Amplify — data modeling",
    date: "2023-08-16",
    summary:
      "Model a full GraphQL backend in one schema file and let AWS Amplify generate the resolvers, tables, and APIs — plus local mocking.",
    canonicalUrl:
      "https://www.linkedin.com/pulse/tm015-building-scalable-graphql-apis-amplify-data-modeling/",
    canonicalLabel: "LinkedIn",
    body: [
      "## Background",
      "> Caution: will try to sell you Amplify",
      "Let's start with a bit of background — AWS Amplify is a purpose-built AWS service that lets us build scalable backends for mobile and web applications extremely fast.",
      "Amplify:",
      {
        list: [
          "Lets us build scalable backends, because under the hood Amplify uses AWS' serverless services — Cognito for authentication, AppSync for GraphQL APIs, Pinpoint for analytics, and so on. All the serverless services are built for scalability.",
          "Abstracts most of the complex stuff and handles most use cases out of the box — for authentication, all you need is to run \"amplify add auth\" from the CLI and answer a couple of questions.",
          "If some use cases are not handled out of the box, we can implement them using AWS CDK.",
          "We can export the stack using CDK or CloudFormation, so next time we just need a single command to deploy the full backend.",
          "Supports CI/CD for hosting and branched workflows for managing multiple environments — cid, stg, uat, prd, or whatever workflow you have.",
          "Is built for setting up the backend extremely fast.",
        ],
      },
      "Amplify supports both REST APIs (API Gateway under the hood) and GraphQL APIs (AWS AppSync). We are going to discuss the GraphQL API.",
      "## GraphQL API and data modeling",
      "GraphQL consists of:",
      {
        list: [
          "Data model / schema — queries, mutations, subscriptions, user-defined types, and relationships.",
          "Resolvers — functions whose job is, given a query/mutation/subscription, to figure out how to modify or fetch data from the configured data sources.",
          "Data sources — anything from a MySQL database to an API call.",
        ],
      },
      "In the case of Amplify, setting up a GraphQL API means writing a schema with user-defined types only. You give Amplify a GraphQL schema and it will:",
      {
        list: [
          "Generate Query, Mutation, and Subscription types for it.",
          "Write resolver functions for you.",
          "Set up DynamoDB as the data source.",
          "Create tables in DynamoDB.",
        ],
      },
      "And since it's AWS, it will let you use Cognito, API keys, and other authorization methods (like Lambda) for the generated APIs — at the type level and even at the level of a single attribute. It supports user groups, and can do a bunch of ML-related things like identifying text or labels on an image and translating text, using the AWS-defined @predictions directive.",
      "All while allowing you to customize the API's behavior by writing custom resolvers in JavaScript or VTL (advanced use cases, mostly not needed).",
      "And the best part — you can use Amplify DataStore with it. DataStore is local storage which syncs data to the backend automatically: if you're mutating data without internet, it makes the changes locally and syncs when the connection is restored. This minimizes reload times and lets users keep working regardless of connectivity. Side note: DataStore can even be used without an AWS account.",
      "### Data modeling",
      "We'll be making an API for a blogging platform: users own blogs, blogs have posts, and other users can comment on posts.",
      {
        code: "type User @model {\n  id: ID!\n  firstName: String!\n  lastName: String!\n  email: String!\n  blogs: [Blog!] @hasMany\n  comments: [Comment] @hasMany\n}\n\ntype Blog @model {\n  id: ID!\n  name: String!\n  owner: User! @belongsTo\n  posts: [Post] @hasMany\n}\n\ntype Post @model {\n  id: ID!\n  title: String!\n  blog: Blog @belongsTo\n  comments: [Comment] @hasMany\n}\n\ntype Comment @model {\n  id: ID!\n  post: Post @belongsTo\n  content: String!\n  commentor: User! @belongsTo\n}",
      },
      "The user has a hasMany relationship with Blog, and a Blog has an owner with belongsTo — a two-way one-to-many relationship: a user can have many blogs, and a blog belongs to a user, so we can get the user's details from the blog itself. The same shape connects blogs to posts, posts to comments, and users to comments.",
      "Keywords in the schema:",
      {
        list: [
          "ID is a unique identifier field. Omit it and Amplify makes ID the table's primary key by default; change that with the @primaryKey directive.",
          "type defines a user-defined data type.",
          "@model tells Amplify to create a DynamoDB table for this type.",
          "@hasMany defines a one-way one-to-many relationship between two types.",
          "@belongsTo makes the relationship two-way.",
        ],
      },
      "## Deploying the API",
      "To deploy on AWS you need an AWS account and the Amplify CLI installed and configured. Then, from your terminal:",
      {
        list: [
          "amplify init — initializes the Amplify project locally. Answer the questions and move on once the project is set up.",
          "amplify add api — choose GraphQL as the API type, create a blank schema, choose defaults for the rest, and paste in the schema above (it lives at amplify → backend → api → [api name] → schema.graphql).",
          "amplify push — deploys the API to the backend.",
        ],
      },
      "## Mocking",
      "Amplify lets you mock services like the API locally — make changes, save, and they're reflected in the mock server automatically, which seriously speeds up development. Run amplify mock api and it gives you a link to the local mock server, with a full set of generated queries and mutations to play with: create a user, create a blog against that user's id, add posts and comments, then query a full blog post with its comments in one request.",
      "One warning: avoid list queries in production — they do full table scans, and as your tables grow they get expensive. Use them for demonstration only.",
      "## Wrap-up",
      "With just a schema file, we have a full working blog backend that covers the common use cases — and extremely complex models are possible using the provided custom directives.",
    ],
  },
  {
    slug: "using-redux-with-nextjs-13-app-router",
    title: "Using Redux with Next.js 13 App Router",
    date: "2023-05-24",
    summary:
      "Server components changed where Redux lives — the provider pattern that keeps your Next.js 13 app server-rendered.",
    canonicalUrl:
      "https://www.linkedin.com/pulse/using-redux-nextjs-13-app-router-antematter/",
    canonicalLabel: "LinkedIn",
    body: [
      "With the new Next.js 13 App Router, Next.js has made all components server components by default. This changes a lot of things and introduces different ways of doing things — and one of the things that needs slight modification is the way we define and use Redux.",
      "## Creating and providing the store",
      "The differences from the old pages router come down to one fact:",
      "> All components are server components by default",
      "Since all components are server components by default, we cannot use state-related hooks in them. To use such features, a component must become a client component by putting 'use client' at the top of the file. And there's no _app.js to wrap with <Provider> anymore — the App Router gives us layout.js for that job.",
      "## Bad approach",
      "One way is to simply put 'use client' at the top of the root layout.js and provide the store there — but this makes every child component a client component, and we lose the benefits of server components entirely.",
      "## Good approach",
      {
        list: [
          "Create a custom provider component marked 'use client'.",
          "Wrap it around the children in layout.js.",
          "Provide the store inside the provider component.",
          "Return the {children} passed into it.",
        ],
      },
      "### layout.js",
      {
        code: "import ReduxProvider from \"./ReduxProvider\";\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang=\"en\">\n      <body>\n        <ReduxProvider>{children}</ReduxProvider>\n      </body>\n    </html>\n  );\n}",
      },
      "### ReduxProvider.js",
      {
        code: "\"use client\";\n\nimport { Provider } from \"react-redux\";\nimport { store } from \"./store\";\n\nexport default function ReduxProvider({ children }) {\n  return <Provider store={store}>{children}</Provider>;\n}",
      },
      "This way the provider itself is a client component, but everything it wraps stays server-renderable.",
      "## Using Redux: patterns",
      "Redux lives on the client side, so components that consume it must be client components. Next.js provides a few patterns to keep the app optimized when mixing server and client components.",
      "## Move client components to the leaves",
      "Push client components — anything interactive, anything using Redux — as far down the tree as possible. This ensures the maximum number of components stay server-rendered.",
      "## Pass server components as props",
      "Sometimes an interactive client component needs to show data fetched in a server component. Importing a server component inside a client component is an antipattern — it forces another round trip to render the nested component. The supported pattern is to pass the server component as a prop (typically children) to the client component from a shared parent.",
      "Following these patterns keeps the app optimized and the user experience fast.",
    ],
  },
  {
    slug: "streaming-ui-with-suspense-in-nextjs",
    title: "Streaming UI with Suspense in Next.js",
    date: "2023-05-23",
    summary:
      "Progressively render pages with React Suspense in Next.js — better perceived performance without hurting SEO.",
    canonicalUrl:
      "https://medium.com/@usamahafeez0/streaming-ui-with-suspense-in-nextjs-e30ac1466dbc",
    canonicalLabel: "Medium",
    body: [
      "Hello everyone! In this post we're going to discuss streaming UI using Suspense, its benefits, and its effect on SEO.",
      "## Demo",
      "Let's start with what we've built: a simple webpage that loads a video from a URL. The important thing to notice is the suggested videos and comments — they arrive as a \"streamed\" response. The whole page is not built at once; it builds progressively as data keeps arriving from the server.",
      "In our case, first the video starts playing, then two seconds later (a setTimeout mimicking data fetching) suggested videos are fetched and displayed, and after two more seconds the comments load and show up.",
      "## Components involved — Suspense",
      "So, what's Suspense? Suspense is a React feature that lets us handle async operations in a declarative, more readable way.",
      "We can wrap components with async dependencies in a <Suspense> component and provide a fallback UI. The fallback is displayed while the async operation completes. It simplifies handling loading states.",
      "## How streaming works",
      "Next.js supports server-side rendering, which in short works by fetching the data required by the page on the server, rendering the HTML on the server, and sending it all to the client.",
      "Data fetching is blocking — we need to fetch a page's data before we can render and hydrate it on the client.",
      "But React is a great candidate for streaming because it's based on components, and each component can be treated like a separate page. A component goes through the SSR steps and appears on the client while sibling components on the same page are still fetching their data. This enables progressively building the UI.",
      "## Code explanation",
      "This is our SuggestedVideos component that fetches the videos (mocked with setTimeout):",
      {
        code: "async function getSuggestedVideos() {\n  await new Promise((resolve) => setTimeout(resolve, 2000));\n  return Array.from({ length: 10 }, (_, index) => \"Video\");\n}\n\nexport default async function SuggestedVideos() {\n  const suggestedVideos = await getSuggestedVideos();\n  return suggestedVideos.map((video, index) => {\n    return (\n      <div\n        className={`flex flex-row items-center ${\n          index != 0 ? \"p-4\" : \"px-4 pb-4\"\n        }`}\n      >\n        <div className=\"rounded bg-slate-700 w-44 h-20\"></div>\n        <p className=\"p-2\">Video {index + 1}</p>\n      </div>\n    );\n  });\n}",
      },
      "This is our Comments component that fetches the comments:",
      {
        code: "async function getComments() {\n  await new Promise((resolve) => setTimeout(resolve, 4000));\n  return Array.from({ length: 20 }, (_, index) => \"Comment\");\n}\n\nexport default async function Comments() {\n  const comments = await getComments();\n  return comments.map((comment, index) => {\n    return <p className=\"p-2\">Comment {index + 1}</p>;\n  });\n}",
      },
      "And this is our Homepage component that shows the video and wraps the comments and suggested videos in <Suspense>:",
      {
        code: "export default function Homepage() {\n  return (\n    <div className=\"flex flex-row justify-between px-20 py-10\">\n      <div className=\"pr-6 flex flex-col flex-grow-2 w-2/3\">\n        <div className=\"flex flex-col\">\n          <VideoPlayer></VideoPlayer>\n        </div>\n        <div className=\"pt-6\">\n          <Suspense fallback={<p>Loading comments...</p>}>\n            <Comments></Comments>\n          </Suspense>\n        </div>\n      </div>\n      <div className=\"flex-grow\">\n        <Suspense fallback={<p>Loading suggested videos...</p>}>\n          <SuggestedVideos></SuggestedVideos>\n        </Suspense>\n      </div>\n    </div>\n  );\n}",
      },
      "As in the code above, we're using <Suspense> to wrap our Comments and SuggestedVideos components, both of which fetch data asynchronously before rendering. Full code on GitHub: github.com/UsamaHafeez0/streaming-suspense-and-seo",
      "## Main idea and benefits",
      "The fallback should be meaningful UI — it can even carry state, like the name of the video currently loading.",
      "The main idea behind this simple pattern is to improve user experience and perceived loading performance. It's useful wherever a slow request would otherwise block the whole UI from rendering.",
      "## Impact on SEO",
      "Streaming doesn't affect SEO in any negative way.",
    ],
  },
  {
    slug: "what-is-flutter-bloc-part-1",
    title: "What is Flutter Bloc (Part 1)",
    date: "2023-04-06",
    summary:
      "State management in Flutter, and how Bloc's events, states, and layers keep large apps maintainable and testable.",
    canonicalUrl: "https://medium.com/@usamahafeez0/what-is-flutte-f17462b2347e",
    canonicalLabel: "Medium",
    body: [
      "## State management in Flutter",
      "State management is the process of updating and managing the state of an application. It's a necessity for bigger, more complex projects — without it, code becomes hard to manage and prone to bugs.",
      "Without state management we'd pass data between screens manually and trigger updates manually too, which becomes problematic as the app grows. If you're building an e-commerce app with a product list, product details, and a cart page, you'd be shuttling the same state between screens by hand. And careless use of setState can quietly degrade performance.",
      "Benefits of state management:",
      {
        list: [
          "Performance and granular control — tools like Bloc offer fine-grained listening (context.select), rebuilding only the parts of the UI that changed.",
          "Separation of concerns — business logic lives apart from UI, which improves readability, maintainability, and testability.",
          "Scaling — a structured approach keeps code maintainable as the app grows in size and complexity.",
          "Reusability — separating UI from logic lets you reuse state management code across widgets and screens.",
        ],
      },
      "## What is Bloc and Cubit",
      "Flutter Bloc is a state management pattern. Its purpose is to separate the user interface (presentation) from the underlying logic of the application, making the code easier to test and reuse.",
      "### Bloc",
      "With the Bloc pattern we have events, states, and the bloc. Events are actions a user can perform, like clicking a button. State is data that changes over time and affects the UI, like a counter's value. The Bloc is where the business logic lives: events go in, are mapped to new states, and states come out. Bloc uses streams to emit states.",
      "For example: when the user swipes down to refresh, we add a RefreshScreen event; inside the Bloc we fetch the latest data on that event and emit a new state built from it.",
      "### Cubit",
      "Cubit is also used for state management and is very similar to Bloc, except it uses functions to emit new states instead of events.",
      "Bloc vs Cubit:",
      {
        list: [
          "Cubit uses functions to emit state whereas Bloc uses events.",
          "Cubit is simpler and relatively easy to understand.",
          "Cubit has limited capabilities compared to Bloc and may not suit larger, complex applications.",
        ],
      },
      "## Flutter Bloc widgets",
      "The flutter_bloc package provides widgets for implementing the pattern. The important ones:",
      "### BlocBuilder",
      "Requires a Bloc and a builder function; builds UI in response to new states. Omit the Bloc and it looks one up from the current BuildContext. An optional buildWhen(previous, current) gates rebuilds.",
      {
        code: "BlocBuilder<BlocA, BlocAState>(\n  buildWhen: (previousState, state) {\n    // return true/false to determine whether or not\n    // to rebuild the widget with state\n  },\n  builder: (context, state) {\n    // return widget here based on BlocA's state\n  }\n)",
      },
      "### BlocSelector",
      "Filters updates by selecting a slice of the Bloc's state — no rebuild unless the selected value changes.",
      {
        code: "BlocSelector<BlocA, BlocAState, SelectedState>(\n  selector: (state) {\n    // return selected state based on the provided state.\n  },\n  builder: (context, state) {\n    // return widget here based on the selected state.\n  },\n)",
      },
      "### BlocProvider",
      "Provides a Bloc to a widget's children via BlocProvider.of(context) — dependency injection for Blocs. It creates the Bloc (lazily by default) and closes it automatically. BlocProvider.value passes an existing Bloc to another subtree; MultiBlocProvider merges several providers without nesting.",
      {
        code: "BlocProvider(\n  create: (BuildContext context) => BlocA(),\n  child: ChildA(),\n);",
      },
      "### BlocListener",
      "Invokes a listener once per state change — use it for one-shot side effects like navigation or snackbars. listenWhen fine-tunes when it runs; MultiBlocListener merges several without nesting.",
      {
        code: "BlocListener<BlocA, BlocAState>(\n  listener: (context, state) {\n    // do stuff here based on BlocA's state\n  },\n  child: Container(),\n)",
      },
      "### BlocConsumer",
      "Exposes a listener and a builder together — equivalent to a nested BlocListener + BlocBuilder with less boilerplate, including optional buildWhen and listenWhen.",
      "### RepositoryProvider",
      "Provides a repository instance to a subtree via RepositoryProvider.of(context); MultiRepositoryProvider merges several.",
      "### Extension methods",
      {
        list: [
          "context.read — equivalent to BlocProvider.of<T>(context); mostly used to add events in callbacks.",
          "context.watch — listens to changes on the instance; only usable inside build methods, and at the root of a build it rebuilds the whole widget on every state change.",
          "context.select — listens to changes in a smaller part of the state, e.g. final name = context.select((ProfileBloc bloc) => bloc.state.name).",
        ],
      },
      "## Bloc architecture",
      "The bloc library encourages dividing the application into three layers, each with its own responsibility:",
      {
        list: [
          "Presentation layer — renders itself based on one or more blocs.",
          "Business logic layer — responds to input from the UI with new states, depending on one or more repositories.",
          "Data layer — retrieves and manipulates data; further split into data providers (raw data) and repositories (wrappers around one or more providers that the bloc talks to).",
        ],
      },
      "How does it all connect? The user taps Login on a page rendered by the presentation layer. The page depends on AuthBloc; the tap fires an event handled by AuthBloc, which passes the login request to the auth repository. If we're using Firebase auth, the repository depends on a Firebase data provider that makes the actual API call. Structured this way, everything is testable and reusable — the Firebase data provider could become a package used by other apps.",
      "## Implementing Bloc in Flutter",
      "Continued in Part 2, where we build a small app with all of this.",
    ],
  },
  {
    slug: "how-to-use-flutter-bloc-part-2",
    title: "How to use Flutter Bloc (Part 2)",
    date: "2023-04-06",
    summary:
      "A hands-on Bloc walkthrough: repository, events, states, selectors, and UI wiring in a small Flutter app.",
    canonicalUrl:
      "https://medium.com/@usamahafeez0/how-to-use-flutter-bloc-part-2-668c26d2ac0b",
    canonicalLabel: "Medium",
    body: [
      "Hello readers — we're going to make a simple application to see how Bloc works: an age-guessing app built on the agify.io API. Pass a name as a query parameter and it guesses your age. API URL: https://api.agify.io/?name=NameXYZ",
      "I'm not going into the details of creating a package for the repository; instead there's a simple GuessAgeRepo class provided to the tree with RepositoryProvider.",
      "## File structure",
      "The features directory contains presentation and business-logic code (UI, widgets, Bloc), one nested directory per feature — login, signup, homepage, and so on. Here there's a single feature, Guess Age, holding the guess_age_page UI file and the Bloc files. Alongside it: main.dart and form_submission_status, which could live in a core directory for code shared across features.",
      "## Repo",
      {
        code: "class GuessAgeRepo {\n  final String guessAgeAPIURL = 'https://api.agify.io/?name=';\n\n  Future<int> guessAge({required String name}) async {\n    String APIURL = guessAgeAPIURL + name;\n    log(APIURL);\n    var url = Uri.parse(APIURL);\n    try {\n      var response = await http.get(url);\n      var data = jsonDecode(response.body);\n      log('Data fetched:  ${data.toString()}');\n\n      if(data['age'] != null) {\n        return data['age'];\n      }\n      else{\n        throw Exception('Error guessing age');\n      }\n    }\n    catch (e){\n      log('Error fetching data: ${e.toString()}');\n      rethrow;\n    }\n  }\n}",
      },
      "The repository holds the API URL and one function that calls it with the provided name. Exceptions — a null age, no internet — are thrown here and caught inside the Bloc, which decides what to do (like showing a failure snackbar).",
      "## Bloc",
      "### Events",
      {
        code: "abstract class GuessAgeEvent{}\n\nclass UpdateName extends GuessAgeEvent{\n  String name;\n\n  UpdateName({required this.name});\n}\n\nclass GuessMyAge extends GuessAgeEvent{}",
      },
      "Two events: UpdateName fires when the user edits the input (the Bloc emits a new state with the updated name), and GuessMyAge fires when the user taps the button.",
      "### State",
      {
        code: "abstract class GuessAgeState extends Equatable{}\n\nclass GuessAgeErrorState extends GuessAgeState {\n  final String error;\n\n  GuessAgeErrorState({required this.error});\n\n  @override\n  List<Object?> get props => [error];\n}\n\nclass GuessAge extends GuessAgeState {\n  final String name;\n  final int? age;\n  final FormSubmissionState status;\n\n  GuessAge({required this.status, this.name = '', this.age});\n\n  GuessAge copyWith({\n    FormSubmissionState? status,\n    String? name,\n    int? age,\n  }) {\n    return GuessAge(\n      status: status?? this.status,\n      name: name ?? this.name,\n      age: age ?? this.age,\n    );\n  }\n\n  @override\n  List<Object?> get props => [status, name, age];\n}",
      },
      "Polymorphism gives us two states: an error state (with a message for the snackbar) and the normal state carrying the entered name, the guessed age, and a FormSubmissionState used to show a progress indicator while awaiting the API. States extend Equatable so Bloc can compare them and skip needless rebuilds.",
      "### The Bloc itself",
      {
        code: "class GuessAgeBloc extends Bloc<GuessAgeEvent, GuessAgeState>{\n  GuessAgeBloc({required this.guessAgeRepo}) : super(GuessAge(status: InitialFormSubmissionState())){\n    on<UpdateName>(_updateName);\n    on<GuessMyAge>(_guessMyAge);\n  }\n\n  GuessAgeRepo guessAgeRepo;\n\n  void _updateName(UpdateName event, Emitter<GuessAgeState> emit) {\n    if(state is GuessAge){\n      emit((state as GuessAge).copyWith(name: event.name));\n    }\n  }\n\n  FutureOr<void> _guessMyAge(GuessMyAge event, Emitter<GuessAgeState> emit) async {\n    if(state is GuessAge) {\n      try {\n        String name = (state as GuessAge).name;\n\n        emit((state as GuessAge).copyWith(status: SubmittingFormSubmissionState()));\n\n        int age = await guessAgeRepo.guessAge(name: name);\n        emit((state as GuessAge).copyWith(name: '', age: age, status: InitialFormSubmissionState()));\n      }\n      catch (e){\n          emit(GuessAgeErrorState(error: e.toString()));\n          emit(GuessAge(name: '', status: InitialFormSubmissionState()));\n      }\n    }\n  }\n}",
      },
      "The repo is passed through the constructor rather than instantiated inside — so we can pass a mock repository when testing the Bloc. Before awaiting the API we switch FormSubmissionState to Submitting so the UI can show a loader; on success we update the age, on failure we emit the error state and reset.",
      "### FormSubmissionState",
      {
        code: "abstract class FormSubmissionState {}\n\nclass InitialFormSubmissionState extends FormSubmissionState{}\n\nclass SubmittingFormSubmissionState extends FormSubmissionState{}",
      },
      "Why classes instead of a boolean on the state? Reusability — and it lets us use BlocSelector on exactly this slice, reducing rebuilds.",
      "## UI",
      {
        code: "class GuessAgePage extends StatefulWidget {\n  const GuessAgePage({Key? key}) : super(key: key);\n\n  @override\n  State<GuessAgePage> createState() => _GuessAgePageState();\n}\n\nclass _GuessAgePageState extends State<GuessAgePage> {\n  final TextEditingController nameController = TextEditingController();\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: const Text('Guess My Age'),\n      ),\n      body: BlocListener<GuessAgeBloc, GuessAgeState>(\n        listener: (context, state) {\n          if (state is GuessAgeErrorState) {\n            ScaffoldMessenger.of(context).showSnackBar(\n              SnackBar(\n                backgroundColor: Colors.redAccent,\n                content: Text(state.error),\n              ),\n            );\n          }\n        },\n        child: ListView(\n          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),\n          children: [\n            const Text('Enter you name'),\n            const SizedBox(height: 10),\n            TextField(\n              controller: nameController,\n              decoration: const InputDecoration(border: OutlineInputBorder()),\n              onChanged: (name) =>\n                  context.read<GuessAgeBloc>().add(UpdateName(name: name)),\n            ),\n            const SizedBox(height: 40),\n            BlocSelector<GuessAgeBloc, GuessAgeState, FormSubmissionState>(\n              selector: (state) {\n                if(state is GuessAge){\n                  return (state).status;\n                }\n                else{\n                  return InitialFormSubmissionState();\n                }\n              },\n              builder: (context, status) {\n                return SizedBox(\n                  height: 50,\n                  child: status is SubmittingFormSubmissionState\n                      ? const Center(\n                          child: CircularProgressIndicator(),\n                        )\n                      : ElevatedButton(\n                          onPressed: () {\n                            context.read<GuessAgeBloc>().add(GuessMyAge());\n                            nameController.clear();\n                          },\n                          child: const Text('Guess My Age'),\n                        ),\n                );\n              },\n            ),\n            const SizedBox(height: 20),\n            BlocSelector<GuessAgeBloc, GuessAgeState, int?>(\n              selector: (state) {\n                if (state is GuessAge && state.age != null) {\n                  return state.age;\n                }\n                return null;\n              },\n              builder: (context, age) {\n                return age != null\n                    ? Text('Your guessed age is: $age')\n                    : const SizedBox();\n              },\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}",
      },
      "BlocListener sits at the top to catch error states — per the documentation, use it for things that should happen once per state change, like navigation or snackbars. The TextField dispatches UpdateName on every change. One BlocSelector swaps the submit button for a progress indicator based only on FormSubmissionState; another renders the guessed age and rebuilds only when the age changes. That's the point of BlocSelector over BlocBuilder here: fewer unnecessary rebuilds.",
      "## main.dart",
      {
        code: "void main() {\n  runApp(const MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({Key? key}) : super(key: key);\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: RepositoryProvider(\n        create: (BuildContext context) => GuessAgeRepo(),\n        child: BlocProvider(\n            create: (BuildContext context) => GuessAgeBloc(\n                  guessAgeRepo: context.read<GuessAgeRepo>(),\n                ),\n            child: const GuessAgePage()),\n      ),\n    );\n  }\n}",
      },
      "RepositoryProvider provides the repo, BlocProvider provides the Bloc built from it, and the page consumes both.",
      "## The end",
      "With Bloc we get reusability, maintainability, and code that stays clean as the application grows — plus easy testing, because the code is separated into decoupled layers.",
    ],
  },
];
