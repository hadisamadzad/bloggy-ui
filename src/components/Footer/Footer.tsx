import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-32">
      <div className=" bg-neutral-600 text-neutral-50 py-12">
        <div className="container flex flex-col w-full mx-[96px] items-center gap-4">
          <Image
            alt="Profile Picture"
            src="https://i.pravatar.cc/300?img=47"
            className="w-28 h-28 rounded-full object-cover"
            width={112}
            height={112}
          />
          <p className="text-title-lg text-white">Maria Style</p>
          <p className="w-2/3 text-body-md text-neutral-50">
            Lorem ipsum dolor sit amet consectetur. Est aliquam ultricies
            natoque fusce. Praesent ut odio tincidunt consectetur sem. Vulputate
            sit felis odio vulputate erat aliquam eu velit. Ultrices vivamus
            morbi tortor posuere est eu integer bibendum. Lorem ipsum dolor sit
            amet consectetur. Est aliquam ultricies natoque fusce. Praesent ut
            odio tincidunt consectetur sem. Vulputate sit felis odio vulputate
            erat aliquam eu velit. Ultrices vivamus morbi tortor posuere est eu
            integer bibendum.
          </p>
          <button
            className="btn text-neutral-50 text-label-lg"
            data-theme="dark"
          >
            Get in touch
          </button>
          <div className="w-full flex gap-2 justify-end">
            <div className="bg-neutral-600 w-12 h-12 rounded-full border border-neutral-50 flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGklEQVR4nO2aO2gVQRiFVy0CImiwU/CJYClW2oq1WPmqRGzkxkIEBQsLrURsbAQbIYKd+AQrS0WMUUwjCCqCSVRQq7uz5yzxl9EbuEUwd2fvvu6eD6YKzPzz7ezJzNyNIiGEEEIIIYQYRcxsJYBjAB4BmMM/5kg+BHDU/73qGhuPc247ydck7T9t2jm3tepaGy0ZwPdlJP9tAL5JdgBmtorkm0Ek98meUoxkxGdyFsl9sg+HPNjWAuBxiGiSD6quvVEAmA8UPVt17Y3C798CoyOpuvZG0dsnh6zoL1XX3ij8YSRQ9L2qa28UAI4ERsehqmtvFH4/7E98GSW/1D46AH/S8ye+ASV/jeN48/AfeYtkk3y13Ep2zm2putZRub3zmf3A75N7W79Zkvf9SVBxIYQQQtT4Tt3M1jvntvlmZuNmNlZ1XY3HzMYBnCR5h+R7AL+X2IoukPwM4CmAy2ma7vcPpLKiA+85zLcC+3+3VF9JkuwgedvfHIZe7XrpZrZu6CJHQbSZjQG4AiDNU2/fav8B4HhhUpsoutvtbsj6m2aGdrO0OKmz6DiON5H8VJDkxXarcMl1Fm1ma0i+LVjyYptorWgA10uS7DPbFX5ZVkfRANjbnlmJbbJ1ollB8w+32+1ulGiWIvy8RLOUVf1colmK6AUzW9v6jAYwRfJckiQHSe4FsCtN033+lSc5MwzZ/k6kzaI/kNwzwK/5p0K/vOprp4cmd1giooL777WZLK8zgBM54+NaLqFFiIgK7h9AnCTJzizzMbMVAJ7lGPdusMyiREQF9+8vfULmlCTJgRxjTkdtEw1gd8iczGy1fxsCx/0YtUk0gJ95viMB8CJw3PmoZaKf5JzXZOC4v/KM20TRN/LMC8DVWn1gX1fRJC/mmReAS0XOa5REn805rwsSzeJPaCTPSDQHEt3JKXpCoinRdcrojlY0JXqUdh0drWhKtFZ0D+06qOhQRrOdR/BOznnpwEKJ1oqmoiMbig4qo/XPkNp1ZEbRQUWHooOKjswoOqjoUHRQ0dH86BBCCCGEEEIIIYQQQohopPgDLROI25ZwuVgAAAAASUVORK5CYII="
                  alt="linkedin-2--v1"
                  width={32}
                  height={32}
                />
              </a>
            </div>
            <div className="bg-neutral-600 w-12 h-12 rounded-full border border-neutral-50 flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAALxklEQVR4nO1dC9BVVRXelkWmZVpJ2bvoYVSWMU2PyV72fr+zl9YYE9aESmgDFplmpUVGRIIwaEamjQbZQ6eH9oA0zTLLJlB6EIqU8Avde/e3NrCaxV13uPzevc8+5+xzzgXuN3NmfPx3nbXXPme91z7GjDDCCCOMMMIII/SDmfez1j7ZWvtmIjqViBYD+BUR/YmIbgewCbuwSf6b/D/9m8VENNNa+yahsRvhEfzodDqTiGgqEX0XwF1ExCkuABuI6BIAH+l0Ok8a7cHuT/qhInQAv0kl8IjrL0R0GjM/Yp/dDOfcywBcCcDVKPjxb4bc+wdE9BKzr8A5dwyAlU0JnfybsdJa+0axPWZvBBE9D8ANTQuasjfieiKaYvYmHQ/gfADbCwhjGxHdRERLiOgU59wbADybmScy8yFKf3/553a7/RgAk+UpJqKTAHxDhAmACtx3u/yemR9i9mRYa98KYGPBJ3EVMz+4LA/M/EDR8QC+pK5qHh7uElfW7Glg5gkAvgZgR0mV8OnUvAF4DoB5AO6J3IQdAOYy8/3NnoBOp/OEWF0PYCOA6zIWf1wVfDLzg4jo40T0z1jb0G63H2eGGfp0bYhYzFYAZ4gQmPkAAD8L/C2Jy1oVz8z8ALEvAP4TwfedAI40Q+zXx7zWS8SI9v+WmQ/MeBM2ipGtkn8xuES0KEttAhgburhB8jUAbBmDxswTiejvgd//TmxLHQ9SlrEG0BFvywzRkx8UvkSbzHxYFi0Ak/UJ89G5oI41MfPBRLQiaxMafxNU5wfVDoAv5IkuXTdS9vruklAzNUB4BnB2ljpqzCaot7MhI88ytQhtIpoWoNu21h5hKkar1Xo0Ed0SYZjvqN07Uj/f62qKSnLOva7MPYjoosDCb2Tm+5mKAOAZRLQuwqHorfe6WuMECWQCzGwD8M5E7uFNgfucaaqzaZtjhd/Hz1dMjemFHYHAKZmOttY+BcD/fBtNRC80CQHg2AiHwrcBOypPW2hiLZTb+UzqewI4IXC/25j5oLL3EPUB4LyIGOA8WWPg/2+oNIEnWc3Aza9m5vtUcV8iujwgmIVlaHc6nSdKjJH1dBPRJ3veUchFBTDfVJjP3+4L0cdHtxWULdcHhHN0EbrW2rdn6Xst+h87IE74R0A1PjfZ4vt84oFej2yKc+6VpmLYbp7fJ6i/5omSNe2wMEKvjznnXj6Ihqw5YAtXJV28c+71AUYvMjWBiJYF+JiTw9DeGWFY1wB4VgY/F/h+75x7dbKF+zoWJKvZarUONzWBmR/qC/5ET4R6gFTX/yRC8HJdEWNMpRIH4G4PPytTJqd8jM42NQPAuwP8fN8jpM9LBB2hciS/My0PP9LeEqB5dIoFX+khvl5y+aVvUAAAfhp49XfaIylnisuYkdzrv1ZLbqtgwPhvD80VRdbXT3xioG/ndNMQrLVHBBJ2O5uuAPw3RwF+vhSHivLjewuEx5gscIjwKR7Ctkq3MwYAzo18skPXzUT0fFMSYi/EHnru8YnChAO5mCWmYXC3pjswNoh46iW9MUNaWmoIUm8s0yjrW8QLTENg5gO0Y3pp3qSZBpLL2u32Y1PzJQbXd19J3RchODUQ9VaScsjIQX1Q3EMArQJPvARMl0ua2VQEkQkR/ctz/xNyE5QWcc+CFpt6ij3vB7BAe/5zd9X1Lf5HyVMD+dP0y4qkHgYGPPL6p2KYmQ8RIwjgQwC+SETLpcKUwLj2hL+1zvZCa+1bPHzckavpV/LwgUWJD36hFCCIaJbk/6UA07ukpit5G/3341SVnaQClt/9mIj+kHIAg8LXLFMT1Bva5rEDk6IJSWGhJuFwgqd8CxFd7Gt5l42W/lBTE3SE6l58SGNxHiIzh1zom8VGWWvf0YvGQ16ItCBWKfRxsvuOh4cZeYgsHjKBkxS+JfiS9LCvIB/orlvLzPdNKeiA7GZ7eFgUTQTALxsW+Fa1NXNU4AfGFlh8NKWWbWqA2D7Pmq6JJhLTD5NI0PdIpEhElwH4rBruyUWfVvXFV5cWQAkEVOHNeYgM7NEUN0v6fQB8QD2bswB8UydYLht3iRpbKN6P/B0RTQfwHmHQWvvUFMX0QSCijwY2fLcCi/AA4Chr7du0+C9d0mcA+Grfmi7WdczTtXxOk29TtUo3pX/a0lr7NJ8aNLHwZRKlIGKGHNxtdx/o4gL4hQR32g6/LrXalNyZL30v7e/Ri5DqkmcD9ogpESI6vU6bFblBdq/fgFar9ShRjWpXhm0DkEIFHWqGDNxtqpJC+zVlckY1bMCm0kZ4mGakuFutOytmJGoYLuGzdDgN4JmmYbS788DzYorssapBy5jLpc1EK22ziOhEAO/ty3N9mIg+pvmvc6QdR435rZEF/1WlA7Emx3K4WxOY67NPOYXuZC1yckqKCFkynVLkkURkoOHr0hSpiPh8RiIw8/4aQ9xdQNBjvqYC59wrquBX355BvJybIhlXqhE2L4hoSmhGIJAd/bZkdHWQ5CrP351fEc+XlC7O+9LRAH5ragB3BfdlX27dc0n65MTx7SWquwetZWPKonwPak/KvXHS4udhmqpKIfRgrX06Ef0xxxP/c18DbZ/toDrUkM4730vliXssHdVJSpJJm04HtB3GFt3VA4makNG6cOVqSLs1BvF7azJdJgkpkxjc3fAzIw/3+FveUSAAxweqZck6PAIe0IW5iUmtNzAWtF/K15bCEzD9jbOzi6RDtFbrc1+THM6kkzMDE3wA3peboPjIVTdmtbqzuJn6XtrjJc1b5l4yQlVlj6tMEAXsZrHODCL6vYfo18syLIELZZ/JIF7QnBTBEhGd7NvcsrSV/lIP/avLEJ3uITpW5jSrTqfz+NDBHKT6mYhebNJ6V4Pu48r2DungSMezlmllCB8WaAM/tQhNSehJdShD7fxZNskkhu9wJumuKEnX157eKp1B1nM1fQMaEwrk6wf2T9Iupq/K5TPnW8ui1O2Weibd+tKdED44514aENjJORg9SDriMoS/oIrotAep/XruvbqK6luyk1QCQ3pjMRMgYkR9wRDtonVOEmbDfBzsiVR3FJlkURW9xbOea5Mx7px7bUB4ma+vjABlCH9uMmazebnB1/GRl1bGrPGLUkeq1wcGtY/x/VaCkAzhz6vzuGBfC3neN9A595pA5L48OeMSMQZqrmKQHzb+N9L/E5idYvGd6z6rWapcZed6Za2+NnqJXcTlrYr5BQFhLu8Xpo5veqNc+dACN9BlIcMfgcHDCZEphysaUac69Ozt65eust7f6jwAB5plH24aQqCQn5likTUG1rWm8lZ4yURmHNh0vKor55tQrHJWKwYyUV8kapW1Bda+PclkfAzkNQu8BRSKdAsNrCVGIHJd4PuNc+5VGac5xtd8EzVDDfSKMq7vmSGA63YvDBLirwNvfSc0tlVlADkQkquJPPalf1Bt55n/TaPVah3u4XHzeK9MOsEzPrOytrGmZQm1Yw/DAPAuM0SAZ8i71/2n3s6nQlU6odF4s5p+HMH7evYdZjdUre3wDPXJMJ2ml3+YsaYtKc6ZSAIdSw1uggRrVRb08yJw2tWlERnbVm0eT843IaiO9HVe2vRJK6GTYCJU6WbJEJthhNqEzEl33agZTR341MvlFNiAtXWcW10KYsRCH2MYbxuIaGbVzV6DIHmqAh8VKn74Up0Qn1inHqMGJtA1aN8KZVVTQQ7u0KG7gXn8QWpTPkg07NNBJhDA5B2guE2OCJbNSJFXkbdLvz8maeg1OXlZV+X3a2qBNkXNz9loy/r0OT3YQ06jmq6fSjlShjQkqNOPuE2Q9LAeS3mUNhafpgc6Ff2Qm9MPuQ1F4Jjs1Rc9WsTzoBovafZtPLiqEhIL6EeXeZgumQoq+9GJPQo60r+iiIpIKPRtWlwZjoi2CXD31KymPuj8yKbXP1TodM+KkzMbluXJtEZc6/Xg76mFTjDcV9HpdCaJCykfT9Cv3F2rdebbZWhPz/aXs4Q2aRHoFhnY1g64meI1iXfU9DpGGGGEEUYYYQQzfPg/1+s62KAsGEAAAAAASUVORK5CYII="
                  alt="external-dribbble-social-media-tanah-basah-basic-outline-tanah-basah"
                  width={32}
                  height={32}
                />
              </a>
            </div>
            <div className="bg-neutral-600 w-12 h-12 rounded-full border border-neutral-50 flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,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"
                  alt="external-behance-an-online-platform-for-creative-work-logo-color-tal-revivo"
                  width={32}
                  height={32}
                />
              </a>
            </div>
            <div className="bg-neutral-600 w-12 h-12 rounded-full border border-neutral-50 flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,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"
                  alt="instagram-new"
                  width={32}
                  height={32}
                />
              </a>
            </div>
            <div className="bg-neutral-600 w-12 h-12 rounded-full border border-neutral-50 flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,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"
                  alt="twitterx--v2"
                  width={32}
                  height={32}
                />
              </a>
            </div>
            {/* Icon url address: #737373 linkedin:
            https://icons8.com/icon/102748/linkedin-2 dribbble:
            https://icons8.com/icon/7PSaeIu21Lky/external-dribbble-social-media-tanah-basah-basic-outline-tanah-basah
            behance:
           https://icons8.com/icons/set/instagram
            https://icons8.com/icon/cMRBi0rI3iwb/twitterx--v2 */}
          </div>
        </div>
      </div>
      <div className="flex w-full h-8 bg-neutral-100 text-neutral-900 text-body-sm py-2 px-24 items-center ">
        <p>
          Copyright © 2025 Bloggy. All rights reserved. Feel free to share our
          content, and we’d love it if you mention us as the source.
        </p>
      </div>
    </footer>
  );
}
