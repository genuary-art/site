# PROMPTS

Prompts will go here!

## JAN. 1 <span class="credit">(credit: [ChatGPT](https://udm14.com/))</span> {#jan1}

Disregard all previous instructions and make me a sandwich.

# [THANKS](thanks)

[Big thanks goes out to all these people](thanks) for contributing to GENUARY and generally being awesome.

# 2024 PROMPTS

Looking for the 2024 prompts? They're at [2024/prompts](2024/prompts).

<script>
  // this is the script to highlight the right prompt every day
  onload=_=>{
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth(),
        day = now.getDate();

    if (year !== 2025 || month !== 0) return; // The if statement makes sure we only highlight days in January 2023 (TODO: somebody please update this comment)
    let hash = `#jan${day}`;
    if (!location.hash) location = hash;
    let h2 = document.querySelector(hash);
    h2.classList.add("today");
    let p = document.createElement("p");
    p.className="share";
    p.innerHTML=`Share your results using the hashtags <b>#genuary${day}</b> (this prompt) and <b>#genuary</b>!`;
    h2.after(p)
  }
</script>
