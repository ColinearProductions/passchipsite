import json
import os
import shutil

from mako.lookup import TemplateLookup

mylookup = TemplateLookup(directories=["."], input_encoding='utf-8',
                          output_encoding='utf-8')


def read_data(data_folder_path):
    data_files = [f for f in os.listdir(data_folder_path)]
    all_data = dict()

    for d in data_files:
        name = d.replace(".json", "")
        with open(data_folder_path + os.sep + d) as json_file:
            data = json.load(json_file)
        all_data[name] = data

    return all_data


def parse_mako_file(input_file_path, output_file_path, mylookup, data):
    print input_file_path
    mytemplate = mylookup.get_template("/" + input_file_path)

    input_file = open(output_file_path, "r")
    output = str(mytemplate.render(data=data))
    input_file.close()

    new_contents = output.replace('\n', '')
    output_file = open(output_file_path, 'w')
    output_file.write(new_contents)
    output_file.close()


def run(src_folder, dst_folder, ignored_folders, trasnalted_data):
    if os.path.isdir(dst_folder): #if destination file exists, remove it
        shutil.rmtree(dst_folder)

    shutil.copytree(src_folder, dst_folder)
    for root, dirs, files in os.walk(src_folder):
        for filez in files:
            consider = True
            for f in ignored_folders:
                # print f,src_folder+"/"+f, root
                if src_folder + "\\" + f in root:
                    consider = False
                    print "Dont consider ", root, filez
                    break

            if ".html" in filez and consider:
                parse_mako_file(root + "/" + filez, root.replace(src_folder, dst_folder, 1) + os.path.sep + filez,
                                mylookup, trasnalted_data)





with open('generate-options.json') as data_file:
    config_data = json.load(data_file)

ignored_folders = config_data['ignoreFolders']
source_folder = config_data['sourceFolder']
destination_folder = config_data['destinationFolder']

languages = config_data['languages']


for language in languages:
    language_destination_folder = destination_folder + os.sep + language #todo remove comment
    language_data = read_data(config_data['dataSourceFolder'] + os.sep + language)
    run(source_folder, language_destination_folder, ignored_folders, language_data)




