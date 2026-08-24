import { supabase } from "../services/supabase.service.js";
import { fallbackProjects } from "../controllers/projects.controller.js";
import { fallbackGallery } from "../controllers/gallery.controller.js";

async function runSeed() {
  console.log("🌱 Starting Database Seed to Supabase...");

  try {
    // 1. Seed Projects
    console.log("👉 Seeding projects table in Supabase...");
    
    // Check existing
    const { data: existingProjects, error: fetchErr } = await supabase
      .from("projects")
      .select("id, title");

    if (fetchErr) {
      console.warn("⚠️ Could not fetch existing projects:", fetchErr.message);
    }

    const existingTitles = new Set((existingProjects || []).map((p) => p.title));
    const newProjects = fallbackProjects
      .filter((p) => !existingTitles.has(p.title))
      .map((p) => {
        const { id, ...rest } = p;
        return rest;
      });

    if (newProjects.length > 0) {
      const { data: inserted, error: insertErr } = await supabase
        .from("projects")
        .insert(newProjects)
        .select();

      if (insertErr) {
        console.error("❌ Error inserting projects into Supabase:", insertErr.message);
      } else {
        console.log(`✅ Successfully inserted ${inserted?.length || newProjects.length} new projects into Supabase.`);
      }
    } else {
      console.log(`ℹ️ All ${existingProjects?.length} projects already present in Supabase.`);
    }

    // 2. Seed Gallery
    console.log("👉 Seeding gallery table in Supabase...");
    const { data: existingGallery } = await supabase.from("gallery").select("id, title");
    const existingGalleryTitles = new Set((existingGallery || []).map((g) => g.title));

    const newGallery = fallbackGallery
      .filter((g) => !existingGalleryTitles.has(g.title))
      .map((g) => {
        const { id, ...rest } = g;
        return rest;
      });

    if (newGallery.length > 0) {
      const { data: insertedGal, error: galInsertErr } = await supabase
        .from("gallery")
        .insert(newGallery)
        .select();

      if (galInsertErr) {
        console.error("❌ Error inserting gallery into Supabase:", galInsertErr.message);
      } else {
        console.log(`✅ Successfully inserted ${insertedGal?.length || newGallery.length} gallery items into Supabase.`);
      }
    } else {
      console.log(`ℹ️ All ${existingGallery?.length} gallery items already present in Supabase.`);
    }

    // 3. Final Verification Count
    const { count: finalProjectCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
    const { count: finalGalleryCount } = await supabase.from("gallery").select("*", { count: "exact", head: true });

    console.log("\n📊 Supabase Database Status:");
    console.log(`   • Total Projects in DB: ${finalProjectCount}`);
    console.log(`   • Total Gallery items in DB: ${finalGalleryCount}`);
    console.log("🎉 Seed finished successfully!");
  } catch (err: unknown) {
    console.error("Seed script error:", err);
  }
}

runSeed();
