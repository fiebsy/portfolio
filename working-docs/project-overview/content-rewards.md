OVERVIEW OF CONTENT REWARDS

Revised Text

At the beginning, I had no idea what Content Rewards was, nor did I understand the inner workings of content creation. I was unfamiliar with how the content creation process functions overall. Content Rewards is essentially a system where influencers, music artists, or anyone looking to increase their social media presence can pay for user-generated content (UGC). The goal is to get everyday users to post about them—particularly on TikTok—to help spread the word. In other words, it’s a way to advertise through other people’s social media accounts.

A common example might be an artist like Drake putting up a pot of money, say $10,000, and offering $1 per 1,000 views on a qualifying post. That post must follow specific guidelines—e.g., it could be a “clipping” style, faceless, or other UGC—and it has to promote Drake’s new album without saying anything negative about him. If a post meets the criteria, it gets rewarded. That’s the core concept of Content Rewards.

In practice, an artist or brand starts a “bounty,” sometimes called a Content Rewards campaign, with a list of criteria and a set payout. They can choose up to four platforms—TikTok, X (formerly Twitter), Instagram, or YouTube—to host the campaign. Once the campaign is live, people submit their posts for approval. Before a submission can be accepted, it must be checked for adherence to the guidelines, and then its views must be monitored to ensure there are no artificially inflated (botted) views. This monitoring happens both manually—by checking a views chart and manually examining posts—and through an algorithm that automatically flags any sudden spikes in activity. Each submission can fall into one of four states: Pending, Approved, Flagged (for suspected botting), or Rejected.

My main task was to update this submissions flow. Initially, I knew nothing about the Content Rewards concept or its feature within WAW, and I also lacked deep familiarity with the content creation ecosystem—how creators pay other creators, which agencies manage them, and so on. My first challenge, therefore, was a crash course in how the product and the industry operate. At a fast-paced startup, that meant “drinking from a fire hose” of information. While I prefer to be thorough, startups often require rapid iteration and learning on the fly.

Simplifying the Review Process

The review system had a lot of complaints: to review each submission, admins had to open multiple screens or modals, scroll through various fields, and click several times just to approve or reject. There was no easy way to automate or streamline it. I aimed to consolidate all necessary information into one card, reducing unnecessary elements and repetitive data (like multiple displays of the same view count). This alone cut the clutter significantly.

A major design hurdle was that videos were displayed only through social embeds, which are locked into the aspect ratios, branding, and layouts of platforms like Twitter and TikTok. They’re often hard to resize or style. We considered two solutions: (1) require users to upload their actual video in addition to providing the link, or (2) improve how we render social embeds. Ultimately, we chose to have users upload their videos. Besides giving us more control over how content is displayed, this approach let us effectively “own” the content and style it consistently in our own thumbnails.

After prototyping with both approaches, we decided on uploads. Next, I focused on designing the submission card and the approval flow. We used segmented controls to switch between the four states, and each state needed its own series of modals and confirmation prompts. Approvals, rejections, and flags each required different notifications, and undoing a rejection had high stakes because it could trigger a payment. I tested this heavily with my own dummy submissions before releasing it.

Communication & Collaboration Challenges

Development took around three weeks, and agencies responded positively to the new interface. However, the process was not without obstacles: 1. High Stakes, Tight Deadlines
This is a flagship feature. Any bugs could lead to significant problems (e.g., incorrect payouts). Balancing speed and quality was a constant pressure. 2. Remote Work
I was one of the few remote workers at WAW. Small questions often don’t merit a full call, yet messaging can be slow. I solved this by keeping a shared Google Doc tracking everything I was working on, my upcoming tasks, and my ongoing observations. This way, teammates could check my progress and thought process any time. 3. Monorepo & GitHub Workflow
This was my first time collaborating so closely in a large monorepo. The lead developer, Nicholas, and I often worked on the same files, causing merge conflicts. I learned the importance of coordinating branches and commits to reduce these conflicts.

Once the redesigned flow shipped, I discovered a sorting bug with paid out vs. estimated paid out states. Pending submissions use an estimated payout, while approved ones display an actual payout, so I needed to handle those differently in the sorting logic. It was a quick fix once identified.

Design Highlights

One aspect I’m particularly proud of is the inline chart I created. Previously, reviewing view charts required opening a modal. Now, the chart sits on the right side of the submission card, with the thumbnail on the left. The custom thumbnail mimics Instagram’s auto-play on hover, using minimal controls to keep things clean. The chart itself has integrated tooltips: instead of popping up over the chart, they display in a stat area to avoid overflow issues in small layouts.

Overall, I reduced the old layout from over 30 different elements down to about five main components: the video, user info, two key metrics, and the chart. Additional notifications appear for flagged or rejected statuses. I also updated the hero section to highlight total submissions and visually show the ratio of pending, approved, and flagged posts with a linear pie chart.

Product Design Process

My approach was to fully understand who uses this feature and why. Content Rewards admins primarily need to (1) verify that posts meet guidelines and (2) watch out for suspicious activity. I worked closely with Dylan, the marketing manager who handles Content Rewards, to learn which states matter most to him. For instance, I discovered that pending submissions are checked far more frequently than rejected ones—so I reordered the interface to reflect that priority.

Because we’re a startup, I didn’t have the luxury of running extensive user surveys in advance. Instead, we gathered quick feedback after launch and iterated. It turned out that agencies loved the simplified flow and the ability to see everything at a glance.

In the end, my guiding principles were rapid iteration, transparent communication, and user-focused design. Despite the initial hurdles—my unfamiliarity with the product and the high-pressure environment—I was able to deliver a well-received solution that simplified a critical piece of WAW’s platform.
