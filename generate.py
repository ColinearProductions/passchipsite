import json
import os
import shutil

from mako.lookup import TemplateLookup


def run():
    with open('generate-options.json') as data_file:
        config_data = json.load(data_file)

    ignored_folders = config_data['ignoreFolders']
    src_folder = config_data['sourceFolder']
    dst_folder = config_data['destinationFolder']

    print ignored_folders




    mylookup = TemplateLookup(directories=["."], input_encoding='utf-8',
                          output_encoding='utf-8')

    print mylookup.directories

    try:
        shutil.rmtree(dst_folder)
    except Exception as e:
        print e.message


    shutil.copytree(src_folder, dst_folder)
    for root, dirs, files in os.walk(src_folder):
        for file in files:
            consider = True
            for f in ignored_folders:
                #print f,src_folder+"/"+f, root
                if src_folder+"\\"+f in root:
                    consider = False
                    print "Dont consider ", root, file
                    break

            if ".html" in file and consider:
                parse_mako_file(root+"/"+ file, root.replace(src_folder, dst_folder, 1) + os.path.sep + file, mylookup)


def parse_mako_file(input_file_path, output_file_path, mylookup):

    print input_file_path
    mytemplate = mylookup.get_template("/"+input_file_path)




    input_file = open(output_file_path, "r")
    output = str(mytemplate.render())
    input_file.close()

    new_contents = output.replace('\n', '')
    output_file = open(output_file_path, 'w')
    output_file.write(new_contents)
    output_file.close()


run()
