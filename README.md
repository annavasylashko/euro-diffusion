# euro-diffusion
### Task description
<details>
<summary>View task description :mag:</summary>

>You must write a program to simulate the dissemination of euro coins throughout Europe, using a
>highly simplified model. Restrict your attention to a single euro denomination. Represent European
>cities as points in a rectangular grid. Each city may have up to 4 neighbors (one to the north, east,
>south and west). Each city belongs to a country, and a country is a rectangular part of the plane. The
>figure below shows a map with 3 countries and 28 cities. The graph of countries is connected, but
>countries may border holes that represent seas, or non-euro countries such as Switzerland or
>Denmark. Initially, each city has one million (1000000) coins in its country’s motif. Every day a
>representative portion of coins, based on the city’s beginning day balance, is transported to each
>neighbor of the city. A representative portion is defined as one coin for every full 1000 coins of a
>motif.
>
><img width="200" alt="Screenshot 2023-03-19 at 19 04 24" src="https://user-images.githubusercontent.com/50664700/226192637-4aa8153d-52a0-4ed1-9a29-ecfa7560d667.png">

>Input<br/>
>The input consists of several test cases. The first line of each test case is the number of countries
>(1 ≤ c ≤ 20). The next c lines describe each country. The country description has the format: name xl
>yl xh yh, where name is a single word with at most 25 characters; xl, yl are the lower left city
>coordinates of that country (most southwestward city ) and xh, yh are the upper right city
>coordinates of that country (most northeastward city). 1 ≤ xl ≤ xh ≤ 10 and 1 ≤ yl ≤ yh ≤ 10. The last
>case in the input is followed by a single zero.
><br/><br/>
>Output<br/>
>For each test case, print a line indicating the case number, followed by a line for each country with
>the country name and number of days for that country to become complete. Order the countries by
>days to completion. If two countries have identical days to completion, order them alphabetically by
>name.
>
><img width="400" alt="Screenshot 2023-03-19 at 19 04 43" src="https://user-images.githubusercontent.com/50664700/226192824-f64beaa4-0fbd-4542-b6f5-4723fc48b53c.png">
</details>

## Result
Input file has the same content as example above:

<img width="497" alt="Screenshot 2023-03-19 at 19 10 20" src="https://user-images.githubusercontent.com/50664700/226194481-4a52d559-c6cc-403a-bed5-5c123d4fc42a.png">

The first console block _(pink)_ represents program **start command** and **results**<br/>
The second console block _(lavender)_ represents **test command** and **tests cases with results**

<img width="731" alt="Screenshot 2023-03-19 at 18 39 54" src="https://user-images.githubusercontent.com/50664700/226192322-303ae13a-8944-4e9b-af48-c304e26c6581.png">
