# Visualizing America's Science and Tech Policy Ecosystem
*Marble Labs*

**BLUF:** I spent the last two years learning how the science and tech (S&T) policy ecosystem works. Now I want to share it with others via visualization to get them up to speed.

## Background

What is the motivation for these changes? What problems will this solve? Include graphs, metrics, etc. if relevant.

My name is Sosa, and I have worked in S&T Policy for the last two years, most recently at the [Day One Project](http://dayoneproject.org), where I’ve been able to develop ambitious and actionable science and tech policy ideas on an array of issues, such as

- [Reforming](https://www.armed-services.senate.gov/imo/media/doc/FY22%20NDAA%20Executive%20Summary.pdf) the $700B+ defense budget
- [Electrifying](https://www.dayoneproject.org/post/support-electrification-at-regional-airports-to-preserve-competitiveness-improve-health-outcomes) 5000 airports to eradicate lead poisoning and achieve decarbonization
- [Training](https://www.dayoneproject.org/post/expanding-the-graduate-research-fellowship-program-to-preserve-american-innovation) diverse scientists in fields like AI, biotech, and quantum computing.
- [Creating](https://www.dayoneproject.org/post/creating-an-api-standard-for-election-administration-systems-to-strengthen-u-s-democracy) API standards for election admin systems to strengthen democracy.

Working in this space has granted me specialized knowledge about how the Federal Government works and the corresponding mechanisms of S&T Policy. The discipline is growing (especially as billionaires like [Eric Schmidt](https://www.schmidtfutures.com/) and [Patrick Collison](https://progress.institute/) take interest),  and there’s an increasing amount of dedicated doing impact work. However, I’ve found that the S&T policy space is still very nascent, and the extreme disconnect between technologists and policy is still as real as ever, which if you’ve ever watched the Facebook [hearings](https://www.youtube.com/watch?v=ncbb5B85sd0&ab_channel=CNET), *you know what I mean.* A *[lot](https://www.c-span.org/video/?462071-1/technology-companies-algorithms),* and I mean ***a [lot](https://www.c-span.org/video/?509234-1/senate-intelligence-hearing-solarwinds-hacking)*** of our problems in policy suffer from a [lack](https://www.blackburn.senate.gov/2021/7/mask-mandates-are-about-power-not-science) of [perspective](https://www.youtube.com/watch?v=ncbb5B85sd0&ab_channel=CNET) from [technologists](https://www.cnbc.com/2021/08/16/tax-foundation-infrastructure-bill-crypto-tax-provision-is-unworkable.html). But this also means that there is an opportunity for folks like us to **meaningfully contribute.**

# Project Goals

What are the outcomes that will result from these changes? How will we evaluate success for the proposed changes?

1. At a high level, we should be able to map the various institutions, entities, initiatives within the S&T ecosystem. “Ecosystem” is a broad term, but it essentially means should be able to answer questions like:
    1. Where does innovation happen?
    2. How does the government fund small businesses?
    3. What public entities are responsible for driving progress on clean energy technology and clean infrastructure?
    4. How the hell does science & tech policy work?

    *Metric -* Topics mapped, nodes in the graph.


This would provide value to various S&T institutions and technologists looking to get into the space. In the future, I see this living on a site that has other essays and resources relating to science and technology.

1. Make the map publicly available for consumption.
    1. Before doing this, release an MVP version for friends and trusted colleagues.
    2. *Metric - Amount of views*

MVP

- Have a set of three topics, and maybe 10 subtopics, and try to imitate the function of Quanta’s as closely as possible.

### Nice to Haves

- Submission Features for users in order to crowdsource new additions to the graph.
- Ideally, it’d be nice to have S&T policy ideas be associated with different nodes on the graph.

### Non-Goals

To narrow the scope of what we're working on, outline what this proposal will not accomplish.

- This is not intended to be an in-depth walkthrough of specific concepts.
- No walls of text explaining niche details that aren’t helpful

# Proposed Solution

Our remedy to this is a graph-based visualization that exhibits the various institutions, entities, and initiatives. across the science and tech ecosystem. There are three main elements to the structure.

1. Topic nodes - see below for an example of the token structure.
    1. id - identifier of the topic, meant to be short and sweet.
    > id: national_labs
    2. name - Name of the topic or institution.
    > name: National Labs
    3. size - size of the node on the graph. Undetermined how I will use this.
    4. date - Not sure of this. Maybe Last updated?
    5. question - prompting question shown when the user clicks a topic.
    > question: What are National Labs?
    6. description - a fitting description of what the topic is. ex: “
    > description: ARPAs create radically better approaches to hard problems by conducting solutions-oriented R&D.
    7. theories - a list of theories or related subtopics.
    > theories: [t_LANL", "t_ANL", "t_ORNL]
    8. children - a list of related topics, with details about their overlaps.
    > children:[{ "id":"darkEnergy","overlap":8},
        > {"id":"hierProb", "overlap":1}]

    Theory tokens follow a similar structure.
    <blockquote>
    id: t_ANL

    name: Argonne National Lab

    description: Argonne National Laboratory is a science and engineering research national laboratory operated by UChicago Argonne LLC for the United States Department of Energy...today it maintains a broad portfolio in basic science research, energy storage and renewable energy, environmental sustainability, supercomputing, and national security.

    links: Argonne ["https://en.wikipedia.org/wiki/Argonne_National_Laboratory"]

    budget: (not implemented yet), $ amount allocated for agency or institution in 2022.
    </blockquote>

    Theory link tokens have the following structure of `source | target | type`
    <blockquote>
    source: t_ORNL (Oak Ridge National Lab)

    target: t_arpaE (Advanced Research Projects—Energy)

    type: sibling
    </blockquote>

**Programming Language**: Currently, we use Javascript, HTML, & CSS for this project. However, we may want to switch to a more modern framework to host this.

**Data Engineering**: Airtable (preferred) or Firebase.

- Host all the data on Airtable for easy management and maintance, as well as for crowdfunding purposes.
- Perhaps depending on how large this gets in the future, we choose to host on AWS.

- Create a new database of the S&T graph.
    - Two tables—one for theories and one for topics, with ther primary key being their `id`. These tables serve as our primary interface with the raw data.
    - Leverage airtable.js to take the graph-based data and serialize to JSON objects, which are then saved to the `data/policy` folder.


## How to Contribute

Contributions are to the S&T Map are encouraged. Contributors can directly contribute through GitHub by making a pull request. Soon, we are also working on an Airtable form as an avenue for contribution.