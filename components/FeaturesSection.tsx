import { Card } from "./ui/card";

export default function FeaturesSection() {
  return (
    <section className="pt-6 border-t-[0.2px]" id="about">
      <h3 className="text-xl font-semibold tracking-wide text-center text-foreground">
        About This Project
      </h3>
      <Card className="p-4 my-3">
        <p className="font-[450] max-w-md  whitespace-pre-wrap">
          This summer I was learning React, Next.js and Tailwind CSS. I wanted
          to build a project that I would use myself. I love watching movies and
          TV shows, that's why I wanted to build a project that would help me
          keep track of what I've watched and what I want to watch in the
          future.
          <br /> <br />
          It was a lot of fun and I learned a lot.
        </p>
      </Card>
    </section>
  );
}
