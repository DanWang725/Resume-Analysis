#include "given.h"


const char titles[NUM_SECTIONS][CHAR_LIMIT] = {"Work Experience", "Skills", "Personal Projects", "Information"};

int main(int argc, char * argv[]) {
	//Declaring Variables
	char tempString[CHAR_LIMIT];

	FILE * inputFile = NULL;
	char test2[CHAR_LIMIT];

	//Opening the File
	inputFile = fopen(argv[1], "r");
	if (inputFile == NULL) {
        printf("File unable to be opened\n");
    }
    else {

    	//Scanning through the text file
		while(fgets(temp2, CHAR_LIMIT, inputFile) != NULL) {
			strcpy(tempString, temp2);
		}
	}
	inputFile.close();
	int totalWorkExperience = locateWorkExperience(tempString);

	printf("Total Work Experience: %d\n", totalWorkExperience);

	return 0;
}

int computeWorkExperience(char buffer[CHAR_LIMIT]) {
	//Declaring Variables
	int loc;
	bool presentDayWorkExp = false;
	char months[2][CHAR_LIMIT];
	int years[2];
	int i;
	int monthVals[2];
	int totalMonths;

	//Finding the end range of the work experience
	for (i = 0; i < strlen(buffer); i++) {
		if (buffer[i] == '-') {
			loc = i + 2; // +2 is to get to the first letter of the second entry

			//Checks if Work Experience goes until present day or not
			if (tolower(buffer[loc]) == 'p') { //Goes until present day
				presentDayWorkExp = true;
			}
			else { //Doesn't go until present day
				presentDayWorkExp = false;
			}

			break;
		}
	}

	//Storing the correct dates
	if (presentDayWorkExp) {
		sscanf(buffer, "%s %d", months[0], &years[0]);
		strcpy(months[1], CURR_MONTH);
		years[1] = CURR_YEAR;
	}
	else {
		sscanf(buffer, "%s %d %*c %s %d", months[0], &years[0], months[1], &years[1]);
	}

	//Turning text to lower case
	for (int j = 0; j < 2; j++) {
		for (i = 0; i < strlen(months[j]); i++) {
			months[j][i] = tolower(months[j][i]);
		}
	}

	//Converting month strings to integer values
	for (i = 0; i < 2; i++) {
		monthVals[i] = findMonthValue(months[i]);
    }

    //Computing the total months worked
    totalMonths = ((years[1] - years[0] + 1) * 12) - (monthVals[0] - 1) - (12 - monthVals[1]);

	return totalMonths;
}

int locateWorkExperience(char inputString[CHAR_LIMIT]) {
	//Declaring Variables

	char buffer[CHAR_LIMIT];
	bool gatheringWorkExperiences = true;
	int totalWorkExperience = 0;

	char * token = strtok(inputString, "\n");

    while(token != NULL) {
		sscanf(token, " %s", buffer);
		token = strtok(NULL, " ");
    	buffer[strlen(buffer) - 1] = '\0';

    	//Checking if at Work Experience Section
    	if (strcmp(buffer, "Work Experience") == 0) {

    		while(token != NULL) {

    			//Gathering and sifting input
				
				sscanf(token, "%s", buffer);
				buffer[strlen(buffer) - 1] = '\0';
				token = strtok(NULL, " ");

				//Checking if at a new section yet
				for (int i = 0; i < NUM_SECTIONS; i++) {
					if (strcmp(buffer, titles[i]) == 0) {
						gatheringWorkExperiences = false;
						break;
					}
				}

				//Computing work experince
				if (gatheringWorkExperiences) {
					totalWorkExperience += computeWorkExperience(buffer);
				}
				else {
					break;
				}

    		}
    		break;
    	}
    	
	}

	return totalWorkExperience;
}

int findMonthValue(char currDate[CHAR_LIMIT]) {

	char months[12][CHAR_LIMIT] = {"january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"};

	for(int i = 0; i < 12; i++){
		if(strcmp(currDate, months[i]) == 0){
			return (i + 1);
			break;
		}
	}
}
