import { SparklesIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const features: FeatureBlockProps[] = [
  {
    title: "Contentful",
    documentationUrl: "https://deptagency.github.io/dash/contentful/index.html",
    logoUrl: "logos/contentful-logo.png",
  },
  {
    title: "Storybook",
    documentationUrl: "https://deptagency.github.io/dash/storybook/index.html",
    logoUrl: "logos/storybook-logo.png",
  },
  {
    title: "Fly.io",
    documentationUrl:
      "https://deptagency.github.io/dash/deployment/Fly.io.html",
    logoUrl: "logos/fly-logo.png",
  },
  {
    title: "Google Maps",
    documentationUrl:
      "https://deptagency.github.io/dash/geolocation/index.html",
    logoUrl: "logos/google-maps-logo.png",
  },
];

export const HomePage = () => {
  return (
    <section className="mx-4 mb-36 mt-16 flex flex-col items-center">
      <motion.div
        className="px-8 text-left lg:px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        whileHover={{ scale: 1.15 }}
      >
        <img
          src="/DEPT-DASH-LOGO.png"
          alt="DEPT DASH™"
          height="200"
          width="388"
          className="h-[200px] w-[388px]"
        />
      </motion.div>
      <div className="mt-8 grid grid-cols-4 gap-8">
        <motion.div
          className="relative col-span-4 m-[2px] cursor-default rounded-md border-2 border-none bg-gradient-to-t from-primary via-red-500 to-yellow-500 p-[2px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="group rounded-md bg-white px-4 py-6 md:px-12">
            <SparklesIcon className="absolute top-5 right-5 h-6 text-yellow-500" />
            <h3 className="text-title-md">Get started</h3>
            <div className="wrap break-keep mt-2 overflow-hidden">
              Change this page by replacing
              <span className="mx-1 rounded-md bg-border-weak px-1 font-bold">
                <code>HomePage.tsx</code>
              </span>
              <span className="hidden md:inline-block">in</span>
              <span className="mx-1 hidden rounded-md bg-border-weak px-1 font-bold md:inline-block">
                <code>routes/index.tsx</code>
              </span>
            </div>
            <p className="mt-2">
              Click on each DEPT DASH™ integration to learn more.
            </p>
          </div>
        </motion.div>

        {features.map((feature, i) => (
          <FeatureBlock key={i} {...feature} />
        ))}
      </div>
    </section>
  );
};

type FeatureBlockProps = {
  logoUrl: string;
  title: string;
  documentationUrl: string;
};

export const FeatureBlock = ({
  title,
  logoUrl,
  documentationUrl,
}: FeatureBlockProps) => {
  return (
    <motion.a
      className="col-span-2 cursor-pointer rounded-md border-2 border-border-weak p-[2px] hover:m-[2px] hover:border-none hover:bg-gradient-to-t hover:from-primary hover:via-red-500 hover:to-yellow-500 md:col-span-1"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: 0.35, duration: 0.8 }}
      href={documentationUrl}
      target="_blank"
    >
      <div className="h-full w-full rounded-md bg-white p-4">
        <div className="text-center">
          <img
            src={logoUrl}
            alt={title}
            className="mb-4 h-[40px] w-[40px]"
            height="40"
            width="40"
          />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
    </motion.a>
  );
};
