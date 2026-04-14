export function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">About Photo</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground mb-4">
            I am a passionate web designer with expertise in creating modern, 
            responsive websites that deliver exceptional user experiences.
          </p>
          <p className="text-muted-foreground mb-4">
            With a keen eye for detail and a commitment to clean, functional design, 
            I transform ideas into digital realities that engage and inspire users.
          </p>
          <p className="text-muted-foreground">
            My approach combines creativity with technical proficiency to build 
            websites that not only look great but also perform flawlessly across 
            all devices and platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
