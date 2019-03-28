import os.path
from subprocess import call

"node npm-translate.js dynamic/data/en/footer.json dynamic/data/es/footer.json es"

data_folder_path = "data"
languages = ["es","fr","de"]


def translate(language):
    english_folder = data_folder_path + os.sep + "en"
    for jsonfile_name in os.listdir(english_folder):
        src_file = english_folder + os.sep + jsonfile_name
        dest_file = "data" + os.sep + language + os.sep + jsonfile_name
        cmd = "node npm-translate.js " + src_file + " " + dest_file + " " + language
        call(cmd)


for language in languages:
    if not os.path.exists(data_folder_path + os.sep + language):
        print "Folder", language, "Does not exist, creting now"
        os.makedirs(data_folder_path + os.sep + language)
        translate(language)
    else:
        print "Folder", language, "Already exists, delete manually if you want translation to avoid overwrite "
