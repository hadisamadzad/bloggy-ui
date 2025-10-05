"use client";
import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="p-4 rounded-lg border border-base-content/30">
      <h2 className="text-title-sm">About me</h2>
      <div className="divider" />
      <div className="flex flex-col items-center gap-4">
        <Image
          alt="Profile Picture"
          src="https://i.pravatar.cc/300?img=59"
          className="rounded-full object-cover"
          width={112}
          height={112}
        />
        <p className="text-title-lg">Hadi Samadzad</p>
        <p className="w-full text-body-md">
          Lorem ipsum dolor sit amet consectetur. Est aliquam ultricies natoque
          fusce. Praesent ut odio tincidunt consectetur sem. Vulputate sit felis
          odio vulputate erat aliquam eu velit. Ultrices vivamus morbi tortor
          posuere est eu integer bibendum. Lorem ipsum dolor sit amet
          consectetur.
        </p>
        <div className="flex w-full mt-12 items-center justify-between">
          <div className=" flex gap-2 justify-end">
            <div className="w-8 h-8 rounded-full border flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACqUlEQVR4nO2aPWgUQRiGH2MRCIIGOwNqFMFSrLSV1GIVYyoRG7lYiKCQwkIrERsbIY2QQDoxJoKVpSKJP5hGEKIIJv5AtFOj6MrILDZqdmdud3Z23gc+rji4mXl2972Z2QEhhBBCCCGEaCk9wCgwB6wAa/ZzFjhmvxee7AaeANl/6jEwKNN+kj+sIzmv95LtxkbgaUHJeS0oRsozWlJyZuuo44VNljuOom+H7nhsvHUUvRy647Gx5ij6a+iOx8aKo+g3oTseG7OOom+F7nhsjDiKHg7d8djosSu+MpLnNY92Y9Cu+IpIfgfs6PLFTk72owJ38s7QHW1LjIzYxciynfqZzxm7EtTunRBCCNHgPfWtwC5b/UBv6E61gX7gJDANvAB+/mUq+gN4DdwDLgFD9oIEI/OoIrj87vN//NYeYMruHLpu7RrpWwhADKJ7gcvAd8/+5rUKHK/AZdSitzm80yxaE3XGSZNFbwdeVSQ5rxsVuo1C9CbgWcWS8xqr2HGjRV+rSbKpL3VsljVR9Dc7PctqrMkURWcBylzcAYmmFtnnJZpaRD+QaGoRbf4XNiuj+X248hxwBDgI7AMO2Ud+sUuyh1L+M1wCDqzTjnnNdsrj5FVep7vgtOsiiuArebHk43zCs72rJCj6M7C35Hg2APc92rxJgqInHMd02KNNc5goOdH7HcfUZ58GlzZfkpjoj57nSB46tmvOiycl+q7nuCYd2/1EYqKve47rStMO2DdV9AXPcV2seFytEX3Wc1zjEk0tK7QzEk0h0R1P0eb1lKIDiW5MRnd0RyPRbZp1dHRHI9G6o/+gWQeKDmU0CS7BO57jUnQg0bqjUXSURtGBokPRgaKjNIoOFB2KDhQdpVF0oOhQdKDoiD86hBBCCCGEEEIIIYQQgvbwC2kZ+2OdICjgAAAAAElFTkSuQmCC"
                  alt="linkedin-2--v1"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <div className="w-8 h-8 rounded-full border flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,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"
                  alt="external-dribbble-social-media-tanah-basah-basic-outline-tanah-basah"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <div className="w-8 h-8 rounded-full border flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,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"
                  alt="external-behance-an-online-platform-for-creative-work-logo-color-tal-revivo"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <div className="w-8 h-8 rounded-full border flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO2cy05UQRCG/wyzITIouFJhqehehUfwsjNI3Btx6VJx7WUrMsAzoFxUfBENDyAOXkGjbLxs2nRSJBMyTvecU93Vfaa+pBKSGTjVXadPd/9/HwBFURRFURRFURRFURRF4aUGYArAfQBrALYAfAfwF4ARjr+Ui81pFcAcgEnKOXvGADwGsJNAR5seowXgEYBTyJDjAJYB/EmgI03J+A1gEcAoMuEGgL0EOs4wxy6AGSRMne56U/FoUluTYhDAZgKdYyLFK2pzEgwAWE+gU0zk2ExlJPTDY8f8JxZSmHB7Sfg9JX0JwFkAR6QbQDnYXC7T873VY5umpRIfpZWBT5J2HzCbypB1YDdg1wG882zbHi27k330vATQQH40aLJN8lE05rnJepr5lr5GneuzWTsZM7HHnnd+Lp0/TjrQPsUGgAn6rOY5Eh7GXHa6tJ2djB474wC+dWjDd/rMMgzgo6PN27FuuCmPu+Em8mG1SzuetX1v1qPdF2MkfN9jqWlHSS7sd2nLz7bv1T1G/t0YCa8JrAhqXfyEsnp+twL8OPTdRUfbnyMCW44k7IYmBT+h5annb3T5GyuHvnvVcc23iECnCas9ziTmJ/x26PkTNII6bbDsDdDOWce17MY0OK5OaSTqJ+x20fPHacL9SbHSofNBbXMVOziuhqbuJzRLSiKh2i+awGBkP6GMnl+5AgwI+QlF9fzKFWBZoPPLLJkrVYAbDH5CbD2/MgUYDeQnhNbzK1OA5cB+Qig9vxIFiOUn1ALo+ZUoQEw/ocas52dfAAk/YZhRz8++AFJ+wiyTnp99AaT8hDqTnp99AdY9Jt5QcOj52Rcgpp+AAHp+9gVw+QmnA+Y+waDnZ18A1/p/KGDuQwx6fuUL0AiYu12O9n0BYlia/+OcPoJ0EhZ/BLmOtTQRDpcA2H4Qq7JzwJzj91uBjrHrRoyY9CjirQAFuO1x3fP9MAJqHq7VB+bV0FEAnxzX7BsxDnRizTjiFaMc/drjeg88/14lCnCKNj3GEQsMhkzT4zq/+s2Q8RHGTNvxEbuBKvLY8bnzbcwLtL8wnKb8V88OshrNHc/VUZ20f5cBcxBfAIwItL8wnAnMeHbSQVg9fwnAFdrVDlGcI6VzqcBJ6muC7S8EdwLNHjuMM54k0H7xBAY8dschQo8mtjHYwxkejnihh3M7T54LETp/vqTnLP4ICq3nT9PKhLvjPxeYcJN8QSOGnj9Co8Fns+azybJ3/TGGvJJ4RSmmqX6STqy9L9Dx2yQvnGDMJ4mX9CT0/BodmrpHR0fe0kj8Q2F/fkOf2bM9FwK9tb6UwmuqUnq+NMm8qC2l50vD5SeURkLPl4bTT2Ahpp4vDbefwEIsPV+aEH4CG6H1fGlC+QlshNLzpQntJ7DCoedLE9tPYEdSzzfCUcRPYEdKzzfCkcy/LpbQ841wlPETghFLzzfCUdZPCE4oPd8IB4efEA1OPd8IB6efEJ0yer4RjhB+ghjd9HwjHDH9BEVRFEVRFEVRFEVRFAX9yz+IEXGrxELzZwAAAABJRU5ErkJggg=="
                  alt="instagram-new--v1"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <div className="w-8 h-8 rounded-full border flex justify-center items-center">
              <a href="#" target="_blank">
                <Image
                  src="data:image/png;base64,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"
                  alt="twitterx--v2"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
          <button className="btn btn-secondary text-label-lg">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
}
