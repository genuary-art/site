# PROMPTS

## JAN. 1 <span class="credit">(credit: [piterpasma](https://piterpasma.nl))</span> {#jan1}

Ask ChatGPT for 31 cool generative art prompts.

Ask ChatGPT to implement one.

Repeat for 31 days.

Fun!!

# [THANKS](thanks)

[Big thanks goes out to all these people](thanks) for contributing to GENUARY and generally being awesome.

<script>
  onload=_=>{
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth(),
        day = now.getDate();
    
    if (year !== 2024 || month !== 0) return; // The if statement makes sure we only highlight days in January 2023
    let hash = `#jan${day}`;
    if (!document.location.hash) document.location = hash;
    let h2 = document.querySelector(hash);
    h2.classList.add("today");
    let p = document.createElement("p");
    p.className="share";
    p.innerHTML=`Share your results using the hashtags <b>#genuary${day}</b> (this prompt) and <b>#genuary</b>!`;
    h2.after(p)
  }
</script>
