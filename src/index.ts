// Simple Pomodoro Timer
// Fixed times: 30 minutes focus, 5 minutes break

import { exec } from "child_process";

const FOCUS_TIME = 30 * 60; // 30 minutes in seconds
const BREAK_TIME = 5 * 60;  // 5 minutes in seconds

// Function to format seconds into mm:ss
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Countdown timer function
function startTimer(duration: number, label: string): void {
  let remaining = duration;
  
  console.log(`\n${label} timer started! Duration: ${formatTime(duration)}\n`);
  
  // Update every second
  const interval = setInterval(() => {
    // Show countdown
    process.stdout.write(`\r⏱  ${formatTime(remaining)} remaining...`);

    remaining--;
    
    // When timer reaches zero
    if (remaining < 0) {
      clearInterval(interval);
      console.log(`\n\n✅ ${label} complete!\n`);
      
      // Play beep sound
      process.stdout.write("\x07");
      
      // Show macOS notification
      exec(`osascript -e 'display notification "${label} timer is complete!" with title "Pomodoro Timer"'`);
    }
  }, 1000);
}

// Main function - check command line arguments
function main(): void {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "focus") {
    startTimer(FOCUS_TIME, "Focus");
  } else if (command === "break") {
    startTimer(BREAK_TIME, "Break");
  } else {
    console.log("Pomodoro Timer");
    console.log("Usage:");
    console.log("  npm start focus   (30 minute timer)");
    console.log("  npm start break   (5 minute timer)");
  }
}

// Run the program
main();

