import subprocess
import datetime
import platform

def run_git_commands():
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_message = f"Update: {now}"

    try:
        # 1. Stage changes
        subprocess.run(["git", "add", "."], check=True)
        
        # 2. Commit changes
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        
        # 3. Push and set upstream explicitly to main
        print("Pushing changes to remote main branch...")
        subprocess.run(["git", "push"], check=True)
        
        print(f"Successfully pushed changes with message: '{commit_message}'")
        return True
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while executing Git commands: {e}")
        return False



if __name__ == "__main__":
    run_git_commands()
