OVERVIEW OF LEADERBOARDS

Translated version LEADERBOARD
⸻

Revised Text

The technical tools that I used at Whop included React, Next.js, TypeScript, and Tailwind. We also used GraphQL for all of our data fetching, while the backend was powered by Ruby. I did occasionally inspect resolver files to understand what could be fetched and how the data was being retrieved. I would sometimes suggest revisions for those resolver files as well. However, because my expertise wasn’t in Ruby, I only touched on that lightly.

My primary focus was building out the leaderboards. This required a solid understanding of the available data and how it was delivered. On the design side, I used Figma and Lottie. As for the design process, there was a lot of benchmarking at the start to understand how typical user-facing leaderboards are structured, especially for a consumer-grade application.

Leaderboards vary: for example, Polymarket-style leaderboards simply show top users globally, whereas other apps (like Peloton, Duolingo, and Mimo) provide a user’s rank relative to the global rankings, plus a tier or group-specific rank. In Whop’s case, you have your specific “WOP” (akin to a Reddit or Discord channel), and you see your rank within it. Because Whop is such a unique application, there weren’t many perfect analogs, so the benchmarking helped inform an initial prototype.

That prototype combined design concepts from social media apps (like Instagram, Threads, Twitter) with leaderboard concepts from Duolingo, Mimo, Peloton, and even sites like Uniswap that effectively use side panels. We also took cues from robust leaderboards such as those used by PGA Tour, the Masters website, and fantasy sports platforms. My design philosophy is not to reinvent the wheel: I follow conventions unless there’s a compelling reason to deviate.

⸻

Identifying the Core Problem

The existing “leaderboard” was really just a searchable directory of users, similar to the Discord sidebar, where you’d type a username to find a specific user in a WOP. Because you could sort by money earned or time spent, I was tasked with reconfiguring this sidebar into a true leaderboard. That meant understanding the API data, which could already sort users by these metrics. However, we also needed rank (e.g., “You are #10,000 out of 40,000”), and that wasn’t built into the existing API.

If the API only returns the sorted list without providing rank, the system ends up needing to iterate through all 40,000 records to figure out who is in 10,000th place. Since I didn’t have auth access to the backend or enough Ruby knowledge to deeply investigate, I was somewhat limited in diagnosing or fixing performance issues. This taught me an important lesson: if you’re building something from scratch, you need a comprehensive understanding of the data sources and how they’re structured. I came in at full speed on a fast-paced project where engineers had limited availability, so it was tricky to ask all the right questions. Ultimately, lack of access led to slower progress on the leaderboard, and the perception that my development process was lagging. If I were to do it over, I’d push harder to get the necessary access up front.

⸻

Building and Refining the Prototype

We created a prototype for the leaderboard during a trial phase to see if Whop wanted to move forward with it. The prototype was well-received, and then passed off to their lead designer, Ilya, who updated it for branding and consistency with the new layout they were rolling out. Meanwhile, I coordinated closely with product manager Ashley Yu to confirm exactly what functionality she needed, ensuring I stayed within scope and met the management team’s expectations.

As we worked, we found more dropdown options in the existing side panel: time spent, money earned, last seen, last time seen within the WOP, and sort by name. We decided to remove sort by name and last seen because they didn’t align with a proper leaderboard’s goals. Sorting by name essentially just creates a table rather than a competitive ranking, and if someone wants to find a user by name, there’s already a search bar. “Last seen” doesn’t add much competitive or comparative value, so we discarded that as well.

Money earned and time spent made the most sense as the two metrics because money earned doesn’t change very often (especially in a WOP of ~8-10 users), while time spent would update more frequently. We built an initial version but noted two significant missing features: 1. Current User Rank
Ilya felt that if your rank appears in the leaderboard list, displaying it again at the top (a “hero” spot) was redundant. My counterargument was that if your rank is outside the top ten, you won’t see it above the fold. Most users primarily want to see their own position relative to everyone else, so having that clearly displayed at the top (like Peloton or Duolingo) is often more motivating and user-friendly. 2. Top Three vs. Overall Rankings
We initially tried separating the top three into a special section with medals. However, this introduces complexity: What if there are ties for second place? What if everyone has a null or zero value? How do we handle awarding medals? We decided that if there are non-null values, we’d display medals for those places, but for very low-activity WOPs or large ties, a split into sections can look awkward. In hindsight, for smaller numbers of active users, we might choose not to assign medals at all, or we might just use indices instead.

Eventually, we included the current user rank at the top and scrapped the strict top-three section in favor of medals for valid (non-null) first, second, and third places only.

⸻

Implementation Details

I adhered to the existing APIs and components, creating a “v2” folder alongside a feature flag to toggle the new design. This was my first time implementing a feature flag. The prototype guided the structure, so coding the new version was fairly straightforward. I implemented a number flow in the header to display rank changes smoothly. I also made sure that all existing functionality—such as the “Pay” button and the different admin vs. user views—still worked properly.

The biggest issue remained the lack of optimization in the APIs for rank calculation. In larger WOPs, the component would freeze because it had to process all users to figure out ranks. We ended up requesting a separate “current user” API, plus distinct APIs for money earned and time spent, which took about a month to develop. During that period, the leaderboard loaded slowly, and many assumed it was my fault rather than an API design issue. In hindsight, I might have been more vocal about blocking the release until those APIs were ready, but there was also pressure to show progress.

Eventually, the “current user” API was deprecated because it still caused latency in large WOPs—likely due to real-time rank calculations. Had I been able to work directly in the resolver files, I would have considered a cron job or another mechanism to snapshot ranks every minute, rather than calculating them on the fly.

⸻

Conclusion

That wraps up the leaderboard project. After delivering the final version, I moved on to another project called “Content Rewards.” Despite the setbacks, it was a valuable learning experience about the importance of having direct access to APIs and backend logic when building out a complex feature like a leaderboard.
