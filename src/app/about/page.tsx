"use client";

import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About <span className="text-accent">Us</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your trusted partner for extraordinary corporate events and conferences.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 text-gray-300 font-light leading-relaxed">
            <FadeIn delay={0.2}>
              <h2 className="text-2xl font-semibold text-white mb-4">Who We Are</h2>
              <p>
                As an all-encompassing Corporate event company, our expansive list of services include End-to-end Event and Conference Management, Event Planning, Incentives and Destination Management, Venue Sourcing, Event Coordination, Décor Hire and Styling, Theming, Entertainment, Custom Builds, Exhibitions.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p>
                Equipped with teams of adept Professionals & Extensive Vendors, we can help you realise your idea and carve an event that communicates and delivers on your objectives.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p>
                We at Virtue IN Agency are professional Corporate Event & Conference Planners. We offer tailored options from full to partial event coordination or a consultancy option where you 'run the show' with access to our knowledge base of information and our guidance for you to confidently organise and run your event.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p>
                Many people with good intentions often underestimate the time and work involved in organising meetings and events until they find themselves partway through the process with fast approaching deadlines with competing priorities. This is where we can help you – by entrusting your event with Virtue IN you will free up your time to be able to focus on your core business, liaise with your clients and work on other projects and strategies in your organisation.
              </p>
            </FadeIn>
          </div>

          {/* Images/Visuals */}
          <FadeIn delay={0.4} direction="left" className="relative h-full min-h-[500px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden glass border-white/5">
              <Image 
                src="/hero_bg.png" 
                alt="Corporate Event Experience" 
                fill 
                className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/40 to-transparent" />
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-sm text-gray-300">To deliver flawless, premium corporate events that leave a lasting impression and drive your business objectives forward.</p>
            </div>
          </FadeIn>
        </div>

        {/* Core Values / Features */}
        <div className="mt-32">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Why Clients <span className="text-accent">Trust Us</span></h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "End-to-End Execution",
              "Adept Professionals",
              "Extensive Vendor Network",
              "Tailored Options",
              "Time & Resource Saving",
              "Strategic Guidance"
            ].map((value, idx) => (
              <FadeIn key={idx} delay={0.1 * idx}>
                <div className="glass p-6 rounded-2xl flex items-center gap-4 hover:border-accent/50 transition-colors">
                  <div className="bg-accent/20 p-2 rounded-full text-accent shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <h4 className="font-semibold text-white">{value}</h4>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
