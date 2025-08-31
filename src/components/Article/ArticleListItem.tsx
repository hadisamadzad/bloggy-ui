import { formatDate } from "@/utils/date-tools";
import Image from "next/image";

type ArticleListItemProps = {
  title: string;
  summary: string;
  thumbnailUrl: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
};

export default function ArticleListItem({
  title,
  summary,
  thumbnailUrl,
  readingTime,
  publishedAt,
  updatedAt,
}: ArticleListItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-none w-[180px] h-30 pt-3">
        <a href="">
          <Image
            alt={title}
            title={title}
            src={thumbnailUrl}
            className="object-cover rounded-lg"
            width={540}
            height={400}
          />
        </a>
      </div>

      <div className="grow">
        <div className="flex justify-between text-neutral-600 mb-1">
          <time className="text-label-md">{formatDate(publishedAt)}</time>
          <time className="text-label-md">{formatDate(updatedAt)}</time>
        </div>

        <a href="">
          <h2 className="text-title-lg">{title}</h2>
        </a>
        <p className="text-body-sm text-neutral-500">{summary}</p>
        <div className="flex justify-between mt-4 text-label-md text-neutral-500">
          <div className="flex gap-6">
            <span className="flex items-center">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVklEQVR4nO2ZPWhTURiGj6AWf1D8QRGcRByKgghuToroJDjpqCIZAjfc87w3yR2UOzmoRTdRKKg4OGgdHBQsjjoI6iLo4GInkYoVtUixRg65hSLNzyWxOUf6wAchkMv7nOQ7OT/G9Blr7SrgkaQvkm5bazeakJBUltSYK+BlFEVDJhSA8fkCeVVMCERRNCRp+m8B4IUJAeDYAqPvatqEAHC3hcCM8Z04jrdJ+tlCYML4DnCpRXjXAw+Mz0RRtA6YaiMQGZ8B0lbh8xo2vpKm6SZgss3ovzc+A4y2G31gxPiKpP3AbAeBI8ZHSqXSCkmvOvz2ncBm4yPA1U7hXTlR4xuSTnYTPq/dxiestXskfSsg8CRN0w3zn5Fl2Wr3HOCEpAvAmKQ3kj65f3Pgu5u98vcP9i28pC3AhwLh5/rgB/A675mPBT//q28TAXCvaPg+1bWew1trjw4ofEPSuZ7CZ1m2Eng3QIHhXvIvk3RjgOEbwKHCqev1+nrgAPBwkOHVFJgFrmRZtrxrgUGH1sJ1MWgBYDJ0ganQBW4FKUCziUfL5fLaUAWedh3cRwE1Jc4HLSDpN3A4ZIGG20QFLZAkSRysADDmLk9CFJgBzrpFZdfhPROYKBzeM4GGpNNBCwDjhQVcw7gz//z04JSkm5K+DkjicmGBFt/KGuAM8HwRw98vNPt0C7DLbbbdNao7+vgHwZ8lSXLcLAZulej2rfk9wXVJjyW9dedBXYb9nA/EHUkla+1O4xNuf12pVLbGcbwjSZK91Wp1n3tdq9W2F1oiL7HEEv8ffwDGqDxM7uvbzwAAAABJRU5ErkJggg=="
                alt="likes"
                className="mr-1"
                width={20}
                height={20}
              />
              324
            </span>
            <span className="flex items-center">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuUlEQVR4nO2Zy2sTURjFb62gouDCJ0h148aFFRHduBDBjS4ElfkHfKGBSbjnXJgshNmJ4kJBQZGi6B8gbkR8QLG6MNbHTi0UH1BRFF2JVqsduXChldxJMulM7g3kwIEwIZnzy3e/zH0I0VNPPXVCfVLKTQCOAxgCMAzgPYBvJP9o69fmmn5viOQxpdSg/qxwLSnlNpIXSE6QTNr0hPmOrZ3O30dyP8nROYS3GsATpdS+wqukfzV9s7wBLK6R3JI7QBzH80meNuO9aIjEVGcKwEl971wgSK4E8KBTAKwHGg7DcMWcIKIoWktyzBUEZ2BeAxhoC6JcLq8C8MY1BGdgxvXoyAQhpVxkGs45AP+HeRzH8cKWQQCcdx2a6T7XajV2kpz2IHCS4mkp5Y6GEHEczwPwzIOwSZMh9kJnbVSNA65DskWbGUBqbzh7XrTh+2kQA573RmLplTV1IHpa7UG4JOPwOmKryHXXwZjdV20Vee5BsCSjn9pAPnsQLMnoTzaQSQ+CJRk9aeuRnx4ESzL6hw3kgwfBkiwG8NEG4v3UhPUetYFc7sKKXLGBHHYdjNl9KG1tPtVF1firlFpdB2JgbncRyB2RJqXUri4C2ZsKYnplxHVINnet6W6k3lgG8Mvz3tjeEGJWr5xwHZjpPiNalVm73/SwGo/CMFzQMoipymLP9rbGACwX7ahUKi0BcM8DiFfWZW0bu47XHELcrVary0Re0uvjDgP8BhAHQdAv8pSUcn2nIACMmPPF/AXgYAcgHpLcLYqU3hArKPxbAGf1qbAoWiTX6Sdqk0BfSB4FcIrkLZIv9aoTwHe9JCX5VR/Y6OYFcFFXuFKpbCg8/GyRvNRkTI9LKTcKn6WUGtT/IA0gbkRRtFT4rCAI+vUpUQpETUq5R3SDaCaPepwDeGfGdwxgs+tsPQnP9Q9U1gamimC6yQAAAABJRU5ErkJggg=="
                alt="comments"
                className="mr-1"
                width={20}
                height={20}
              />
              16
            </span>
            <span className="flex items-center">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABMklEQVR4nO2UPU7DQBCFUyAafgpqpBwFk+M4crHvk40SIbnEHCM3QAkngCoXSEcVAgegoAwasZHAGjumsSgy0jQ78+a9nZndweBg/9pCCBeSxpIeJa0lfUZfx7Ox5fy5cFmWR8AE+AC2e9xyJobpVLwoiktg2aHwtuZLw7YWB4bASx0s6SGEcAWcRE8kzR0Sww7d4mmangIrB3TTJEjS1MlfWS1P/cxTPvieyTFwD7xJ2kiq7CziFg7JrF488fpqbYlKK4e8slgI4bphJslPgmcvaXdVU+4QvFssz/MzDyvpqTOBpI0Tf7VYlmXnXQiStmvKaRFwF7GjvS1qGfJ8N2QjiQP+NWR70XuH3LamkqZNawrcdl7TtocGLGxbDBiFjBqUNz+0Xr6KXj67Xr7rg/VqX1gNJpvt/VsXAAAAAElFTkSuQmCC"
                alt="views"
                className="mr-1"
                width={20}
                height={20}
              />
              14.5K
            </span>
          </div>
          <span>{readingTime}</span>
        </div>
      </div>
    </div>
  );
}
