#include <stdio.h>
#include <string.h>
#include <strings.h>
#include <ctype.h>
#include <stdbool.h>

#define CHAR_LIMIT 256
#define CURR_DATE_VAL 1
#define NUM_SECTIONS 4
#define CURR_MONTH "January"
#define CURR_YEAR 2022

int locateWorkExperience(char inputString[CHAR_LIMIT]);
int findMonthValue(char currDate[CHAR_LIMIT]);
int computeWorkExperience(char buffer[CHAR_LIMIT]);